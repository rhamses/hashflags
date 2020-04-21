<template>
  <div class="columns is-multiline is-mobile is-vcentered">
    <div class="column is-one-fifth-desktop" v-for="hashflag in hashflagsComputed">
      <div class="tile is-parent">
        <article class="tile is-child notification has-background-white-bis item-hashflag">
          <div class="content">
            <div class="content">
                <a v-for="(hs, index) in hashflag.hashtag" target="_blank" :href="`https://twitter.com/search?q=${encodeURIComponent('#' + hs)}`">
                  <p v-if="index <= 2" class="title is-6 has-text-centered">{{(hs) ? `#${hs}` : ''}}</p>
                </a>
                <a v-if="hashflag.hashtag.length > 3" @click="$emit('loadCampaign', hashflag.campaignName)">
                  <p class="hash-appendix is-size-7 has-text-weight-light has-text-centered">
                    {{ $t('more_1') }} <b>{{hashflag.hashtag.length - 3}}</b> {{ $t('more_2') }}
                  </p>
                </a>
                <figure class="image is-64x64">
                	<a @click="$emit('loadCampaign', hashflag.campaignName)">
                  	<img v-lazy="hashflag.assetUrl.original" :alt="(hashflag.hashtag) ? `#${hashflag.hashtag}` : ''">
                  </a>
                </figure>
                <small class="limitDate has-text-centered">{{hashflag.starting | doDate}} - {{hashflag.ending | doDate}}</small>
            </div>
          </div>
        </article>
      </div> 
    </div>
  </div>
</template>

<style scoped>
  .image {
    margin-left: auto;
    margin-right: auto;
  }

  .limitDate {
    display: block;

    font-size: .7rem;
    font-variant-caps: all-petite-caps;
  }
</style>

<script>
  import { format } from 'date-fns';

	export default {
		name: 'Hashflags',
    props: ['listProp'],
    mounted(){
      this.getHashflags();
    },
    data(){
      return {
        totalHashtags: 0,
        hashflags: [],
        hashFlagsFiltered: [],
        fold: 0
      }
    },
    filters: {
      doDate(val){
        return format(new Date(parseInt(val)), 'd-MM-Y');
      }
    },
    computed: {
      hashflagsComputed: {
        get(){
          return this.hashFlagsFiltered;
        },
        set(newVal){
          return this.hashFlagsFiltered = newVal;
        }
      }
    },
    methods: {
      getHashflags(){
        this.$axios.get(`${process.env.VUE_APP_API}/hashflags/list?page=50&skip=${this.fold}`).then(response => {
          if (response.status === 200) {
            this.hashflags = response.data.hashflags;
            this.hashFlagsFiltered = this.hashflags;
          }
        });
      },
      filterHashflags(val){
        if (val.length > 0) {
          window.setTimeout(() => {
            let b = [];
            let scope = this.hashFlagsFiltered;
            const result = scope.filter(hashflag => {
              if (hashflag.campaignName.toLowerCase().replace(" ", "").includes(val.toLowerCase().replace("#","").replace(" ",""))) {
                return hashflag;
              }
              b = hashflag.hashtag.filter(item => {
                if (item.toLowerCase().includes(val.toLowerCase().replace("#",""))) {
                  return item;
                }
              });
              if (b.length > 0 ) {
                return b;
              }
            });
            this.hashflagsComputed = result;
          }, 500);
        }
      }
    }
	}
</script>
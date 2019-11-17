<template>
  <div id="app" class="has-background-light">
    <section class="hero is-medium is-info is-bold">
      <div class="hero-body has-text-centered">
        <div class="container">
          <h1 class="title">
            TWITTER <br> #HASHFLAGS 🚩
          </h1>
          <p class="subtitle">
            <b>Hashflags</b> are always cool! Unfortunately they don't last forever, and sometimes we can't follow all of them on the site.
            <br>
            Here it's possible to look up each one of the <b>{{this.data.totalHashtags}}</b> active right now.
          </p>
        </div>
        <section class="container container--field">
          <div class="columns is-mobile">
            <div class="column">
              <div class="field">
                <div class="control has-icons-left">
                  <input v-model="search" class="input" type="search" placeholder="#Search for hashflags or campaings">
                  <span class="icon is-small is-left">
                    <i class="fas fa-search fa-xs"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <button class="button is-link is-light" @click="showTags = !showTags">
                    <i class="fas fa-xs" :class="(showTags ? 'fa-angle-down' : 'fa-angle-right')"></i> See all campaings
                  </button>
                </div>
              </div>
              <div id="tags" class="tags" v-show="showTags">
                <button @click="loadCampaing(campaing)" class="tag is-link" v-for="campaing in campaings">{{campaing}}</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
    <div class="columns is-multiline is-mobile is-vcentered">
      <div class="column is-one-fifth-desktop" v-for="hashflag in hashflagsFiltered">
        <div class="tile is-parent">
          <article class="tile is-child notification has-background-white-bis">
            <div class="content">
              <div class="content">
                <a target="_blank" :href="`https://twitter.com/search?q=${encodeURIComponent('#' + hashflag.hashtag)}`">
                  <p class="title is-5 has-text-centered">{{(hashflag.hashtag) ? `#${hashflag.hashtag}` : ''}}</p>
                  <figure class="image is-64x64">
                    <img :src="hashflag.assetUrl.original" :alt="(hashflag.hashtag) ? `#${hashflag.hashtag}` : ''">
                  </figure>
                  <small class="limitDate has-text-centered">{{hashflag.starting}} - {{hashflag.ending}}</small>
                </a>
              </div>
            </div>
          </article>
        </div> 
      </div>
    </div>
  </div>
</template>

<style scoped>
  .limitDate {
    display: block;

    font-size: .7rem;
    font-variant-caps: all-petite-caps;
  }

  .image {
    margin-left: auto;
    margin-right: auto;
  }

  .tags {
    max-height: 100px;
    overflow-y: scroll;
  }

  .container--field {
    margin-top: 1em;
  }
</style>

<script>
  import 'bulma/css/bulma.min.css'
  import '@fortawesome/fontawesome-free/css/all.min.css';

  export default {
    name: 'app',
    created(){
      this.$axios.get(`${process.env.VUE_APP_API}/hashflags`).then(response => {
        if (response.status === 200) {
          this.data = response.data,
          this.hashflags = response.data.hashflags,
          this.campaings = response.data.campaigns
        }
      });
    },
    data(){
      return {
        data: [],
        hashflags: [],
        campaings: [],
        search: '',
        showTags: false
      }
    },
    computed: {
      hashflagsFiltered(){
        let b = '';
        return this.hashflags.filter(hashflag => {
          if (hashflag.campaignName.includes(this.search)) {
            return hashflag;
          }

          b = hashflag.hashtag.filter(item => {
            if (item.includes(this.search)) {
              return item;
            }
          });

          if (b.length > 0 ) {
            return b;
          }

          
        });
      }
    },
    methods: {
      loadCampaing(value){
        this.search = value;
      }
    }
  }
</script>

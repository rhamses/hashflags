<template>
  <div id="app" class="has-background-light">
    <section class="hero is-medium is-info is-bold">
      <div class="hero-body has-text-centered">
        <div class="container">
          <h1 class="title">
            TWITTER <br> #HASHFLAGS 🚩
          </h1>
          <p class="subtitle">
            <span v-html="$t('title[0]')"></span>
            <br>
            <span v-html="placeholder($t('title[1]'))"></span>
          </p>
        </div>
        <section class="container container--field">
          <div class="columns is-mobile">
            <div class="column">
              <div class="field">
                <div class="control has-icons-left">
                  <input v-model="search" class="input" type="search" :placeholder="$t('searchPlaceholder')">
                  <span class="icon is-small is-left">
                    <i class="fas fa-search fa-xs"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <button class="button is-link is-light" @click="showTags = !showTags">
                    <i class="fas fa-xs" :class="(showTags ? 'fa-angle-down' : 'fa-angle-right')"></i> {{ $t('campaignsCTA') }}
                  </button>
                </div>
              </div>
              <div id="tags" class="tags" v-show="showTags">
                <button @click="loadCampaing(campaing)" class="tag is-link" v-for="campaing in campaigns">{{campaing}}</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
    <div v-show="loading" class="loader--wrapper" :class="(fold > 0) ? 'loader-after-pagination': ''">
      <div class="loader" id="loader-5">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p> {{ $t('loading') }} </p>
    </div>
    <div class="columns is-multiline is-mobile is-vcentered">
      <div class="column is-one-fifth-desktop" v-for="hashflag in hashflagsFiltered">
        <div class="tile is-parent">
          <article class="tile is-child notification has-background-white-bis">
            <div class="content">
              <div class="content">
                  <a v-for="hs in hashflag.hashtag" target="_blank" :href="`https://twitter.com/search?q=${encodeURIComponent('#' + hs)}`">
                    <p class="title is-6 has-text-centered">{{(hs) ? `#${hs}` : ''}}</p>
                  </a>
                  <figure class="image is-64x64">
                    <img v-lazy="hashflag.assetUrl.original" :alt="(hashflag.hashtag) ? `#${hashflag.hashtag}` : ''">
                  </figure>
                  <small class="limitDate has-text-centered">{{hashflag.starting | doDate}} - {{hashflag.ending | doDate}}</small>
              </div>
            </div>
          </article>
        </div> 
      </div>
    </div>
  </div>
</template>

<style scoped>

.button-back {
  position: fixed;
  top: 2em;
  right: 0;
}

.loader--wrapper {
  padding-top: 1em;
  text-align: center;
  text-transform: uppercase;
}

.loader--wrapper p {
  padding-top: 1em;
}

  .loader{
    width: 100px;
    height: 100px;
    border-radius: 100%;
    margin: 0 auto;
  }

  .loader-after-pagination {
    bottom: 3em;
    height: 50px;
    position: fixed;
    width: 50px;
    right: 3em;
    z-index: 10;
  }

  #loader-5 span {
  display: block;
  position: absolute;
  left: calc(50% - 20px);
  top: calc(50% - 20px);
  width: 20px;
  height: 20px;
  background-color: #3498db;
}

#loader-5 span:nth-child(2){
  animation: moveanimation1 1s ease-in-out infinite;
}

#loader-5 span:nth-child(3){
  animation: moveanimation2 1s ease-in-out infinite;
}

#loader-5 span:nth-child(4){
  animation: moveanimation3 1s ease-in-out infinite;
}

@keyframes moveanimation1{
  0%, 100%{
    -webkit-transform: translateX(0px);
    -ms-transform: translateX(0px);
    -o-transform: translateX(0px);
    transform: translateX(0px);
  }

  75%{
    -webkit-transform: translateX(30px);
    -ms-transform: translateX(30px);
    -o-transform: translateX(30px);
    transform: translateX(30px);
  }
}

@keyframes moveanimation2{
  0%, 100%{
    -webkit-transform: translateY(0px);
    -ms-transform: translateY(0px);
    -o-transform: translateY(0px);
    transform: translateY(0px);
  }

  75%{
    -webkit-transform: translateY(30px);
    -ms-transform: translateY(30px);
    -o-transform: translateY(30px);
    transform: translateY(30px);
  }
}

@keyframes moveanimation3{
  0%, 100%{
    -webkit-transform: translate(0px, 0px);
    -ms-transform: translate(0px, 0px);
    -o-transform: translate(0px, 0px);
    transform: translate(0px, 0px);
  }

  75%{
    -webkit-transform: translate(30px, 30px);
    -ms-transform: translate(30px, 30px);
    -o-transform: translate(30px, 30px);
    transform: translate(30px, 30px);
  }
}


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

  .button__lazyload {
    position: fixed;
    bottom: 0;
    right: 0;

    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 0;
    font-size: 14px;
  }
</style>

<script>
  import 'bulma/css/bulma.min.css'
  import '@fortawesome/fontawesome-free/css/all.min.css';
  import { format } from 'date-fns';
  
  export default {
    name: 'app',
    beforeMount(){
      this.getInitialHashflags();
    },
    created(){
      if (navigator.language == "pt-BR" || navigator.language == "pt") {
        this.$i18n.locale = "pt_BR";
        this.messages = this.$i18n.messages['pt_BR'];
      } else {
        this.messages = this.$i18n.messages['en'];
      }
    },
    mounted(){
      this.scroll();
    },
    filters: {
      doDate(val){
        return format(new Date(parseInt(val)), 'd-MM-Y');
      }
    },
    data(){
      return {
        data: [],
        hashflags: [],
        hashflagsTotal: [],
        campaigns: [],
        messages: {},
        loading: true,
        button: {
          text: "Show More...",
          action: "plus",
          modifier: 100,
          min: 50
        },
        search: '',
        showTags: false,
        triggerScroll: true,
        totalHashtags: 0,
        fold: 0
      }
    },
    computed: {
      buttonText:{
        get(){
          this.button.text = this.messages.button.more;
          return this.button.text;
        },
        set(newVal){
          this.button.text = newVal;
          return this.button.text;
        },
      },
      hashflagsFiltered(){
        let b = [];
        let scope = this.hashflagsTotal;
        let a;
        if (this.search.length > 0) {
          this.triggerScroll = false;
          this.scroll();
          return scope.filter(hashflag => {
            if (hashflag.campaignName.toLowerCase().includes(this.search.toLowerCase().replace("#",""))) {
              return hashflag;
            }

            b = hashflag.hashtag.filter(item => {
              if (item.toLowerCase().includes(this.search.toLowerCase().replace("#",""))) {
                return item;
              }
            });

            if (b.length > 0 ) {
              return b;
            }
          });
        } else {
          this.triggerScroll = true;
          this.scroll();
          return this.hashflags;
        }
      }
    },
    methods: {
      placeholder(val){
        const key = val.match(/\[(.*?)\]/gmi)[0].replace('[', '').replace(']', '');
        val = val.replace(val.match(/\[(.*?)\]/gmi)[0], '<b>' + this[key] + '</b>');
        return val;
      },
      loadCampaing(value){
        this.search = value;
      },
      getInitialHashflags(){
        this.$axios.get(`${process.env.VUE_APP_API}/hashflags/campaigns`).then(response => {
          if (response.status === 200) {
            this.campaigns = response.data.campaigns;
          }
        });

        this.$axios.get(`${process.env.VUE_APP_API}/hashflags/total`).then(response => {
          if (response.status === 200) {
            this.totalHashtags = response.data.total[0].count;
          }
        });

        this.$axios.get(`${process.env.VUE_APP_API}/hashflags/list`).then(response => {
          if (response.status === 200) {
            this.hashflagsTotal = response.data.hashflags;
          }
        });

        this.$axios.get(`${process.env.VUE_APP_API}/hashflags/list?page=50&skip=${this.fold}`).then(response => {
          if (response.status === 200) {
            this.hashflags = response.data.hashflags;
            this.loading = false;
          }
        });
      },
      scroll (person) {
        if (this.triggerScroll) {
          window.onscroll = () => {
            let bottomOfWindow = window.innerHeight + window.scrollY === document.body.offsetHeight;
            if (bottomOfWindow) {
              this.loading = true;
              this.fold += 50;
              axios.get(`${process.env.VUE_APP_API}/hashflags/list?page=50&skip=${this.fold}`)
                .then(response => {
                  if (response.status === 200) {
                    response.data.hashflags.map(item => this.hashflags.push(item));
                    this.loading = false;
                  }
                });
            }
          };
        } else {
          window.onscroll = () => {return false};
        }
      }
    }
  }
</script>

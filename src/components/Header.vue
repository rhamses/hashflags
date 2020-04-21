<template>
  <div>
    <section v-show="belowFold" :class="{'fixLevel': belowFold}" class="level is-mobile is-info">
      <div class="level-right">
        <div class="level-item">
          <h1 class="is-5 has-text-centered title">
            <a href="#app" >TWITTER #HASHFLAGS 🚩</a>
          </h1>
        </div>
      </div>
      <div class="level-left">
        <div class="level-item">
          <div class="field">
            <div class="control has-icons-left">
              <input v-model="search" @input="filterHashflags" class="input" type="search" :placeholder="$t('searchPlaceholder')">
              <span class="icon is-small is-left">
                <i class="fas fa-search fa-xs"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section ref="heroPanel" class="hero is-medium is-info is-bold">
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
                  <input v-model="search" @input="$emit('filterHashflags', $event.target.value)" class="input" type="search" :placeholder="$t('searchPlaceholder')">
                  <span class="icon is-small is-left">
                    <i class="fas fa-search fa-xs"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<style scoped>
  .fixLevel {
    padding-bottom: .5em;
    padding-top: .5em;
    /*position: fixed;*/
    top: 0;
    width: 100%;
    z-index: 10;

    background-color: #3498db;
  }
  
  .fixLevel .title {
    color: #fff;
    font-size: 1em;
  }

  .fixLevel .title a,
  .fixLevel .title a:hover,
  .fixLevel .title a:active,
  .fixLevel .title a:visited {
    color: inherit
  }
</style>

<script>
  export default {
    name: "Header",
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
    data(){
      return {
        belowFold: false,
        fold: 0,
        totalHashtags: 0,
        triggerScroll: true,
        search: '',
        filterHashflags: ''
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
        this.$axios.get(`${process.env.VUE_APP_API}/hashflags/total`).then(response => {
          if (response.status === 200) {
            this.totalHashtags = response.data.total[0].count;
          }
        });
      },
      scroll (person) {
        window.onscroll = () => {
          let bottomOfWindow = window.innerHeight + window.scrollY === document.body.offsetHeight;
          let belowFold = window.scrollY >= this.$refs.heroPanel.offsetHeight;
          
          this.belowFold = belowFold;

          if (this.triggerScroll) {
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
          }
        };
      },
    }
  }
</script>
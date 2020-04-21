<template>
  <div class="about">
    <Header />
    <div class="container">
      <div class="columns is-multiline is-mobile is-vcentered">
        <div class="column">
          <br>
          <h1 class="title">Dados sobre esta campanha: <span class="tag is-primary">{{campaingName}}</span></h1>
          <div class="tile">
            <div class="tile is-parent is-vertical has-background-white-bis">
              <article class="tile is-child is-primary is-vertical">
                <p 
                  style="margin-bottom: .5em;"
                  class= "has-text-centered"
                  v-for="(hs, index) in hashflag.hashtag"
                >
                  <a 
                    target="_blank"
                    class="tag is-info is-light"
                    :href="`https://twitter.com/search?q=${encodeURIComponent('#' + hs)}`">
                    {{(hs) ? `#${hs}` : ''}}
                  </a>
                </p>
              </article>
            </div>
            <div class="tile is-vertical is-parent notification has-background-white-bis">
              <article class="tile is-child is-primary is-centered">
                <figure class="image is-128x128">
                  <img v-lazy="hashflag.assetUrl.original">
                </figure>
              </article>
              <article class="tile is-parent">
                <article class="tile is-child is-primary">
                  <dl>
                    <dt style="margin-bottom: 0" class="title is-5"><b>Data de entrada:</b></dt>
                    <dd style="margin-bottom: .5em">{{hashflag.starting | doDate}}</dd>
                  </dl>
                </article>
                <article class="tile is-child is-primary">
                  <dl>
                    <dt style="margin-bottom: 0" class="title is-5"><b>Data de saída:</b></dt>
                    <dd style="margin-bottom: .5em">{{hashflag.ending | doDate}}</dd>
                  </dl>
                </article>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
  .tile.is-centered {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tile.is-vertical {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .tile.is-parent {
    margin: .5em;
  }

  .about,
  .container,
  .columns.is-multiline {
    height: 100%;
  }
</style>

<script>
import 'bulma/css/bulma.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import { format } from 'date-fns';

export default {
  name: 'Single',
  components: {
    Footer,
    Header
  },
  data(){
    return {
      hashflag: {},
      campaingName: '',
      urlHashflag: ''
    }
  },
  filters: {
    doDate(val){
      return format(new Date(parseInt(val)), 'd-MM-Y');
    }
  },  
  mounted(){
    this.campaingName = this.$route.params.campaingName;
    this.urlHashflag = this.$route.params.hashflag;

    if (this.urlHashflag) {
      document.querySelector('meta[property="og:image"').content = `https://hashflags.s3.amazonaws.com/social-media/${this.campaingName}_${this.urlHashflag}.png`
    } else {
      document.querySelector('meta[property="og:image"').content = "https://hashflags.s3.amazonaws.com/social-media/hashflags-frame.png"
    }

    this.$axios.get(`${process.env.VUE_APP_API}/hashflags/${this.campaingName}`).then(response => {
      if (response.status === 200) {
        this.hashflag = response.data.hashflags[0];
      }
    });

  }
}
</script>
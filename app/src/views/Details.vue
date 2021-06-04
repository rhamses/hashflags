<template>
  <section class="bg-blue-50 min-h-screen" v-if="hashflag">
    <Header class="sticky top-0 w-full"></Header>
    <div class="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 container ml-auto mr-auto pt-10">
      <article class="rounded-md bg-white p-5">
        <figure class="text-center">
          <img class="inline" :src="hashflag.assetUrl.original" :alt="hashflag.campaignName">
        </figure>
      </article>
      <article class="rounded-md bg-white p-5 flex justify-center items-center flex-wrap">
        <Hashtag 
        @mouseover="isActive = index"
        @hashtagSelected="loadTweetsByHashtag" 
        :active="index === isActive ? true : false" 
        :hashtag="item" 
        :key="index"
        v-for="(item, index) in hashflag.hashtag" />
      </article>
      <article class="rounded-md bg-white p-5 col-span-2">
        <h2 class="text-lg font-bold">Recent Tweets</h2>
        <Loader class="text-center" v-if="timeline.length == 0" />
        <carousel :items-to-show="3" v-if="timeline && timeline.length > 0">
          <slide v-for="(tweet, slide) in timeline" :key="slide">
            <Tweet :tweet="tweet" :hashflag="hashflag.assetUrl.original" class="slide--item__card" />
          </slide>

          <template #addons>
            <navigation />
          </template>
        </carousel>
      </article>
    </div>
  </section>
</template>

<style scoped>
  .slide--item__card {
    margin: 1em;
    flex: 1;
  }
</style>

<script>
  import Header from '../components/Header.vue'
  import Hashtag from '../components/PillHashtag.vue';
  import Tweet from '../components/TwitterCard.vue';
  import Loader from '../components/Loader.vue';
  import 'vue3-carousel/dist/carousel.css';
  import { Carousel, Slide, Navigation } from 'vue3-carousel';

  export default {
    components: {
      Header,
      Hashtag,
      Tweet,
      Carousel, 
      Slide, 
      Navigation,
      Loader
    },
    mounted(){
      this.loadHashflag();
    },
    data(){
      return {
        hashflag: null,
        timeline: [],
        isActive: 0
      }
    },
    methods: {
      loadHashflag(){
        const campaign = this.$route.params.campaign;
        fetch(`${import.meta.env.VITE_API}/details/${campaign}`)
        .then(response => response.json())
        .then(response => {
          this.hashflag = response[0];
          this.loadTweetsByHashtag();
        })
        .catch(e => console.log("e", e));
      },
      loadTweetsByHashtag(e){
        let campaign;
        this.timeline = [];
        if (e) {
          campaign = e.replace('#', '');
        } else {
          campaign = this.hashflag.hashtag[0];
        }
        fetch(`${import.meta.env.VITE_API}/timeline/${campaign}`)
        .then(response => response.json())
        .then(response => {
          this.timeline = response;
        })
        .catch(e => console.log("e", e));
      }
    }
  }
</script>
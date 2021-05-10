<template>
  <section class="bg-blue-50 min-h-screen" v-if="hashflag">
    <Header class="sticky top-0 w-full"></Header>
    <div class="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 container ml-auto mr-auto pt-10">
      <article class="rounded-md bg-white p-5">
        <figure class="text-center">
          <img class="inline" :src="hashflag.assetUrl.original" :alt="hashflag.campaignName">
        </figure>
      </article>
      <article class="rounded-md bg-white p-5">
        <Hashtag v-for="(item, index) in hashflag.hashtag" :hashtag="item" :key="index" />
      </article>
      <article class="rounded-md bg-white p-5 col-span-2">
      </article>
    </div>
  </section>
</template>

<script>
  import Header from '../components/Header.vue'
  import Hashtag from '../components/PillHashtag.vue';

  export default {
    components: {
      Header,
      Hashtag
    },
    mounted(){
      this.loadHashflag();
    },
    data(){
      return {
        hashflag: null
      }
    },
    methods: {
      loadHashflag(){
        const campaign = this.$route.params.campaign;
        fetch(`${import.meta.env.VITE_API}/hashflags/${campaign}`)
        .then(response => response.json())
        .then(response => {
          this.hashflag = response.hashflags[0];
        })
        .catch(e => console.log("e", e));
      }
    }
  }
</script>
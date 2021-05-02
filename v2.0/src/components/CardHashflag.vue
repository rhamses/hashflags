<template>
  <div class="flex flex-col justify-between max-w-sm rounded overflow-hidden shadow-lg h-50 pt-5 overflow-hidden bg-white">
    <div class="flex">
      <figure class="ml-10 mr-2 flex flex-col justify-center hash--image">
        <img :src="hashflag.assetUrl.original" alt="Mountain">  
      </figure>
      <div class="pt-4 pb-2">
        <Hashtag :hashtag="hashflag.hashtag[0]" />
        <router-link class="block text-center break-words text-blue-800 text-xs" to="/details" v-if="total > 0"> and {{ total }} more hashtags</router-link>
      </div>
    </div>
    <router-link 
    to="/details" 
    class="bg-blue-400 hover:bg-blue-300 text-white text-center transition p-2 mt-10 block text-sm">
    Learn more about
  </router-link>
</div>
</template>

<script>
  import Hashtag from './PillHashtag.vue';

  export default {
    name: 'CardHashflag',
    props: ['hashflag'],
    components: {
      Hashtag
    },
    computed: {
      total(){
        return this.hashflag.hashtag.length - 1;
      }
    }
  }
</script>

<style scoped>
.hash--image {
  min-width: 72px;
}
</style>
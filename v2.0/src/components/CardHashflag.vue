<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg h-50 pt-5 overflow-hidden">
    <div class="flex">
      <figure class="ml-10 mr-5 flex flex-col justify-center hash--image">
        <img :src="hashflag.assetUrl.original" alt="Mountain">  
      </figure>
      <div class="px-6 pt-4 pb-2">
        <a 
        :href="`https://twitter.com/search?q=${encodeURIComponent(`#${hashflag.hashtag[0]}`)}`"
        target="_blank"
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
        #{{hashflag.hashtag[0]}}
      </a>
      <router-link class="block  text-blue-800 text-xs" to="/details" v-if="total > 0"> and {{ total }} more hashtags</router-link>
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
  export default {
    name: 'CardHashflag',
    props: ['hashflag'],
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
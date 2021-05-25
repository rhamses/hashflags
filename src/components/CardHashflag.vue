<template>
  <div 
    class="flex flex-col justify-between rounded overflow-hidden h-50 overflow-hidden relative"
    :class="[{'bg-white pb-16 pt-5 shadow-lg': !search}]">
    <div class="flex" :class="[{'justify-evenly': !search}, {'justify-center': search}]">
      <figure class="lg:ml-10 mr-2 flex flex-col justify-center" :class="[{'hash--image': !search}, {'hash--image__sm': search}]">
        <img :src="hashflag.assetUrl.original" alt="Mountain">  
      </figure>
      <div class="pt-4 pb-2">
        <Hashtag :search="search" :hashtag="hashflag.hashtag[0]" />
        <router-link class="block text-center break-words text-blue-800 text-xs" to="/details" v-if="cta && total > 0"> and {{ total }} more hashtags</router-link>
      </div>
    </div>
    <router-link v-if="cta"
    :to="'/details/' + hashflag.campaignName"
    class="bg-blue-400 hover:bg-blue-300 text-white text-center transition p-2 bottom-0 absolute w-full block text-sm">
    Learn more about
  </router-link>
</div>
</template>

<script>
  import Hashtag from './PillHashtag.vue';

  export default {
    name: 'CardHashflag',
    props: {
      hashflag: {
        type: Object,
        required: true,
        default: {}
      },
      cta: {
        type: Boolean,
        required: true,
        default: true
      },
      search: {
        type: Boolean,
        required: true,
        default: false
      }
    },
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

.hash--image__sm {
  max-width: 40px;
}

.hash--image {
  max-width: 72px;
}
</style>
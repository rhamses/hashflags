<template>
  <a 
  @mouseover="emitHashtag"
  @mouseleave="isActive = false"
  :href="`https://twitter.com/search?q=${encodeURIComponent(`#${hashtag}`)}`"
  target="_blank"
  class="hashtag-pill inline-block rounded-full px-3 py-1 font-semibold mr-2 mb-2"
  :class="[
  {'text-xs': search}, 
  {'text-sm': !search}, 
  {'bg-blue-500 text-white': active}, 
  {'bg-gray-200 text-gray-700': !active}
  ]">
  #{{hashtag}}
</a>
</template>

<style>
.hashtag-pill {
  transition: all .25s ease-in-out;
}
</style>

<script>
  export default {
    name: 'PillHashtag',
    methods: {
      emitHashtag(e){
        this.$emit('hashtagSelected', e.target.innerText);
      }
    },
    watch: {
      isActive(e){
        return e;
      }
    },
    props: {
      hashtag: {
        type: String,
        required: true,
        default: ''
      },
      search: {
        type: Boolean,
        required: true,
        default: false
      },
      active: {
        type: Boolean,
        required: true,
        default: false
      },
    }
  }
</script>
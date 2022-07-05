<template>
  <a 
  :href="`https://twitter.com/search?q=${encodeURIComponent(`#${hashtag}`)}`"
  target="_blank"
  class="inline-block bg-gray-200 rounded-full px-3 py-1 font-semibold text-gray-700 mr-2 mb-2"
  :class="[{'text-xs': search}, {'text-sm': !search}]">
    #{{hashtag}}
  </a>
</template>

<script>
  export default {
    name: 'PillHashtag',
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
      }
    }
  }
</script>
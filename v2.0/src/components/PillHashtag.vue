<template>
  <a 
  :href="`https://twitter.com/search?q=${encodeURIComponent(`#${hashtag}`)}`"
  target="_blank"
  class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
    #{{hashtag}}
  </a>
</template>

<script>
  export default {
    name: 'PillHashtag',
    props: ['hashtag']
  }
</script>
<template>
  <section class="bg-blue-50">
    <Header class="sticky top-0 w-full" />
    <GalleryHashflags class="p-10" />
  </section>
</template>

<script>
import Header from '../components/Header.vue'
import GalleryHashflags from '../components/GalleryHashflags.vue'

export default {
  components: {
    Header,
    GalleryHashflags
  }
}
</script>
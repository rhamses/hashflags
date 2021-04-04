<template>
  <section>
    <Header class="sticky top-0 w-full" />
    <GalleryHashflags />
    <Footer />
  </section>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import GalleryHashflags from '../components/GalleryHashflags.vue'

export default {
  components: {
    Header,
    Footer,
    GalleryHashflags
  }
}

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>
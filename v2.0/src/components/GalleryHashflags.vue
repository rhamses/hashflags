<template>
  <section class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <article v-for="item in items" class="flex justify-center" v-if="items.length > 0 ">
      <Card :hashflag="item" class="flex-1" /> 
    </article>
  </section>
</template>

<script>
  import Card from './CardHashflag.vue'
  export default {
    name: "GalleryHashflags",
    mounted(){
      this.scroll();
      this.loadItems();
    },
    components: {
      Card
    },
    data(){
      return {
        items:  [],
        fold: 0,
        loading: true
      }
    },
    methods:  {
      loadItems(){
        fetch(`${import.meta.env.VITE_API}/hashflags/list?page=50&skip=${this.fold}`)
        .then(response => response.json())
        .then(response => {
          response.hashflags.map(hl => this.items.push(hl));
          this.loading = !this.loading;
        })
        .catch(e => console.log("e", e));
      },
      scroll() {
        document.addEventListener('scroll', () => {
          const actualScroll = window.scrollY;
          const bodySize = document.body.offsetHeight;
          if (actualScroll >= bodySize * .5 && this.loading === false) {
            this.loading = !this.loading;
            window.setTimeout(function(vue) {
              vue.fold = (vue.fold > 0) ? vue.fold + 50 : 50;
              vue.loadItems();
            }, 500, this) 
          }
        })
      }
    }
  }
</script>
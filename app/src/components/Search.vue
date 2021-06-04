<template>
  <section class="lg:relative">
    <div class="px-2 py-2 text-sm text-gray-500 rounded-md bg-white flex items-center min-w-full">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input v-model="query" @keyup="searchItem" type="search" placeholder="search for hashflags" class="pl-1 w-full">  
    </div>

    <div v-if="results && query.length > 0" class="absolute left-0 shadow-lg w-full max-h-40 overflow-y-scroll bg-white pt-2 mt-3">
      <Card class="border-b border-bottom-solid " :hashflag="item" :search="true" v-for="(item, index) in results" :key="index" :cta="false" />
    </div>
  </section>
</template>

<script>
  import Card from './CardHashflag.vue'
  export default {
    components: {
      Card
    },
    name: 'Searchbar',
    data() {
      return {
        timer: null,
        query: '',
        results: null
      }
    },
    methods: {
      searchItem(){
        if (this.query.length === 0) {
          this.results = null;
          clearTimeout(this.timer);
          this.timer = null;
        }

        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        } else if(this.query.length !== 0) {
          this.timer = setTimeout(() => {
            fetch(`${import.meta.env.VITE_API}/search?q=${this.query}`)
            .then(response => response.json())
            .then(response => {
              this.results = [...response];
            })
            .catch(e => console.log("e", e));
          }, 1000);
        }
      }
    }
  }
</script>
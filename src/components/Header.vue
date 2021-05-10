<template>
  <header class="bg-gray-800 border-bottom border-gray-300 sticky">
    <nav>
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <router-link to="/">
                <img class="h-8 w-8" src="../../public/favicon.svg" alt="Workflow">
              </router-link>
            </div>
            <h1 class="site--title text-white text-xl font-normal leading-normal ml-3">
              <router-link to="/">HASHFLAGS</router-link>
            </h1>
          </div>
          <div class="w-2/3 ml-10 md:ml-0">
            <Searchbar />
          </div>
          <div class="hidden md:block">
            <div class="flex justify-between items-center">
              <a href="https://github.com/rhamses/hashflags" title="Project repository" target="_blank" class="mr-4">
                <svg enable-background="new 0 0 32 32" height="32px" id="Layer_1" version="1.0" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path clip-rule="evenodd" d="M16.003,0C7.17,0,0.008,7.162,0.008,15.997  c0,7.067,4.582,13.063,10.94,15.179c0.8,0.146,1.052-0.328,1.052-0.752c0-0.38,0.008-1.442,0-2.777  c-4.449,0.967-5.371-2.107-5.371-2.107c-0.727-1.848-1.775-2.34-1.775-2.34c-1.452-0.992,0.109-0.973,0.109-0.973  c1.605,0.113,2.451,1.649,2.451,1.649c1.427,2.443,3.743,1.737,4.654,1.329c0.146-1.034,0.56-1.739,1.017-2.139  c-3.552-0.404-7.286-1.776-7.286-7.906c0-1.747,0.623-3.174,1.646-4.292C7.28,10.464,6.73,8.837,7.602,6.634  c0,0,1.343-0.43,4.398,1.641c1.276-0.355,2.645-0.532,4.005-0.538c1.359,0.006,2.727,0.183,4.005,0.538  c3.055-2.07,4.396-1.641,4.396-1.641c0.872,2.203,0.323,3.83,0.159,4.234c1.023,1.118,1.644,2.545,1.644,4.292  c0,6.146-3.74,7.498-7.304,7.893C19.479,23.548,20,24.508,20,26c0,2,0,3.902,0,4.428c0,0.428,0.258,0.901,1.07,0.746  C27.422,29.055,32,23.062,32,15.997C32,7.162,24.838,0,16.003,0z" fill="#fff" fill-rule="evenodd"/><g/><g/><g/><g/><g/><g/></svg>
              </a>
              <a href="https://amb1.io" target="_blank" title="Company's Website">
                <svg width="32" height="32" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0)">
                    <path d="M104.182 67.0925V41.9399C82.8422 41.9399 21.6369 72.0269 20.0177 145.851C19.3109 178.071 40.0312 211.185 56.1152 224.495C81.2454 246.394 108.513 250 125.522 250C146.372 250 165.335 244.092 182.316 233.436C210.616 215.678 230.798 184.183 230.798 145.851C230.798 74.3764 175.106 46.7959 147.26 41.9399V67.0925C166.608 72.1381 205.304 94.9537 205.304 145.851C205.304 196.747 157.275 224.495 125.522 224.495C63.5167 224.495 46.2704 172.065 45.3979 145.851C45.3979 101.054 83.7527 72.214 104.182 67.0925Z" fill="#BDD747"/>
                    <path d="M119.762 0L105.78 13.982L113.673 22.3642L119.933 16.1045V144.371H131.428V0H119.762Z" fill="white"/>
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect width="250" height="250" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.site--title {
  font-family: 'Comfortaa';
  font-weight: 700;
  letter-spacing: .08rem;
}
</style>

<script>
  import Searchbar from './Search.vue';
  export default {
    components: {
      Searchbar
    },
    name: 'Header'
  }
</script>
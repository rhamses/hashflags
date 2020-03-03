<template>
	<section>
		<section class="level is-mobile is-info fixLevel">
      <div class="level-right">
        <div class="level-item">
          <h1 class="is-5 has-text-centered title">
            <a href="/#/" >TWITTER #HASHFLAGS 🚩</a>
          </h1>
        </div>
      </div>
      <div class="level-left">
        <div class="level-item">
          <div class="field">
            <div class="control has-icons-left">
              <input v-model="search" @input="filterHashflags" class="input" type="search" :placeholder="$t('searchPlaceholder')">
              <span class="icon is-small is-left">
                <i class="fas fa-search fa-xs"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
	</section>
</template>

<style scoped>
  .fixLevel {
    padding-bottom: .5em;
    padding-top: .5em;
    /*position: fixed;*/
    top: 0;
    width: 100%;
    z-index: 10;

    background-color: #3498db;
  }
  
  .fixLevel .title {
    color: #fff;
    font-size: 1em;
  }

  .fixLevel .title a,
  .fixLevel .title a:hover,
  .fixLevel .title a:active,
  .fixLevel .title a:visited {
    color: inherit
  }
</style>

<script>
	export default {
		name: "Header"
	}
</script>
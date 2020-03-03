<template>
	<footer class="footer">
	  <div class="content has-text-centered">
	    <p>
	    	{{$t('footer')}}
	    	<a href="https://amb1.tech" target="_blank">
	    		<img width="32px" src="@/assets/logo.png" alt="">
	    	</a>
	    </p>
	  </div>
	</footer>
</template>

<style scoped>
	img {
		vertical-align: middle;
	}

	.footer {
		border-top: solid 1px #ccc;
	}
</style>

<script>
	export default {
		name: "Footer"
	}
</script>
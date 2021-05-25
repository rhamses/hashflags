<template>
  <blockquote class="twitter-card">
    <header class="twitter-header">
      <figure class="twitter-image">
        <img :src="tweet.user.profile_image_url" alt="">
      </figure>
      <p class="twitter-title">
        <b>{{tweet.user.name}}</b>
        <small class="twitter-username">@{{tweet.user.username}}</small>
      </p>
    </header>
    <p class="twitter-content" v-html="formatTweet(tweet.text)"></p>
  </blockquote>
</template>

<script>
  export default {
    props: ['tweet', 'hashflag'],
    methods: {
      formatTweet(text){
        // Create hashflag image
        const hashflagImage = `<img src="${this.hashflag}" style="width: 22px; display: inline; vertical-align: middle" />`;
        // Break Lines
        const regBreakLine = /\n/g;
        if (text.match(regBreakLine)) {
          text = text.replace(regBreakLine, "<br>");
        }
        // Create Hashtag Link
        const regHashtag = /(#.+?\b)/gmi;
        if (text.match(regHashtag)) {
          for(let hashtag of text.match(regHashtag)) {
            // hashtag = encodeURIComponent( hashtag );
            text = text.replace(hashtag, `<a target="_blank" class="twitter-link" href='https://twitter.com/search?q=${encodeURIComponent( hashtag )}'>${hashtag} ${hashflagImage}</a>`)
          }
        }
        // Create Mention Link
        const regMention = /(@.+?\b)/gmi;
        if (text.match(regMention)) {
          for(const m of text.match(regMention)){
            text = text.replace(m, `<a target="_blank" class="twitter-link" href='https://twitter.com/${m.replace('@', '')}'>${m}</a>`)  
          }
        }
        return text;
      } 
    }
  }
</script>

<style>
  .twitter-card {
    padding: 20px;

    border: solid 1px rgb(196, 207, 214);
    border-radius: 10px;
  }

  .twitter-link {
    color: rgb(27, 149, 224);
    font-weight: bold;
  }

  .twitter-header {
    display: flex;
    vertical-align: middle;
    align-items: center;
  }

  .twitter-image {
    display: block;
    margin-bottom: 1rem;
    margin-right: 10px;
    
    border-radius: 50%;
    overflow: hidden;
  }

  .twitter-title {
    line-height: 1;
  }

  .twitter-username {
    display: block;
  }

  .twitter-content {
    line-height: 2;
  }
</style>
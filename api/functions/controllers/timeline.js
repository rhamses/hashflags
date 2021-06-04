const axios = require("axios");

module.exports = async (hashtag) => {
  const config = {
    method: 'get',
    url: `https://api.twitter.com/2/tweets/search/recent?query=%23${hashtag}&expansions=author_id&user.fields=profile_image_url,verified&media.fields=duration_ms,height,media_key,preview_image_url,public_metrics,type,url,width`,
    headers: { 
      'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAAEs9DwEAAAAAlBZxzGuMY6XWzM2eS9On4A%2FXFpA%3D7elc0RiJ3IBbMqzUNqpYDongUIPSkabTMQpY67UJPGAJlkwS2o', 
    }
  };

  try {
    const tweets = await axios.get(config.url, { headers: config.headers});
    const response = [];

    for (const tweet of tweets.data.data) {
      const username = tweets.data.includes.users.find(item => item.id === tweet.author_id);
      tweet.user = username;
      response.push(tweet);
    }
 
    return response;

  } catch(e) {
    console.log(e);
    return e;
  }}
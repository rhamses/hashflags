const functions = require("firebase-functions");
const bent = require("bent");
const getBuffer = bent("buffer");
const generateImage = require("./generateImage");
const {TwitterApi} = require("twitter-api-v2");

/**
* Posta um tweet com uma imagem em anexa ( ou nao )
* @param {object} params é o id da imagem para fazer anexo
* @param {string} mediaID é o id da imagem para fazer anexo
* @param {string} tweet A frase de resposta para ser inserida no Tweet
* @param {boolean} reply Uma flag para identificar se o tweet é resposta ou Não
* @param {string} tweetID O Id do tweet para ser respondido
* @return {object}
*/
async function postTweet(params) {
  try {
    const {mediaID, tweet, isReply, tweetID, TwitterClient} = params;
    const config = {};
    if (mediaID) {
      config.media = {
        media_ids: [mediaID],
      };
    }
    if (isReply) {
      const {data: createdTweet} = await TwitterClient.v2.reply(
          tweet,
          tweetID,
          {...config});
      return createdTweet;
    } else {
      const {data: createdTweet} = await TwitterClient.v2.tweet(
          tweet,
          {...config});
      return createdTweet;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
/**
* Recebe um BUFFER de imagem e faz o upload para o Twitter.
* Em seguida sobe um texto alternativo para a ilustração da imagem.
* @param {string} image Buffer da imagem para ser feito o upload.
* @param {object} TwitterClient Twitter Client
* @return {string}
* @return {boolean}
*/
async function uploadImage(image, TwitterClient) {
  try {
    const mediaID = await TwitterClient.v1.uploadMedia(image, {
      mimeType: "EUploadMimeType.Png",
    });
    return mediaID;
  } catch (error) {
    console.log(error);
    return null;
  }
}
module.exports = functions
    .https.onRequest(async (request, response) => {
      functions.logger.info(request.body);
      const TwitterClient = new TwitterApi({
        appKey: process.env.APPKEY,
        appSecret: process.env.APPSECRET,
        accessToken: process.env.ACCESSTOKEN,
        accessSecret: process.env.ACCESSSECRET,
      });
      let {
        // campaignName,
        hashtag,
        assetUrl,
        // startingTimestampMs,
        // endingTimestampMs,
      } = request.body;
      hashtag = `#${hashtag}`;
      const config = {
        text: hashtag,
        textOptions: {
          fill: "rgb(59, 130, 246)",
          stroke: "white",
        },
      };
      config.image = await getBuffer(assetUrl);
      const newImage = await generateImage(config);
      const mediaID = await uploadImage(newImage.image, TwitterClient);
      const result = await postTweet({mediaID, tweet: hashtag, TwitterClient});

      response.send(result);
    });

const functions = require("firebase-functions");
const bent = require('bent')
const getJSON = bent('json')
const getBuffer = bent('buffer')
const {getTime} = require('date-fns')
const {CloudTasksClient} = require("@google-cloud/tasks");
const GenerateImage = require('./generateImage')

async function getCurrentFlags(){
  const year = new Date().getFullYear()
  const month = String(new Date().getUTCMonth() + 1).padStart(2, '0')
  const day = String(new Date().getUTCDate()).padStart(2, '0')
  const hour = String(new Date().getUTCHours()).padStart(2, '0')
  const toFilter = {
    begin: getTime(new Date(new Date().getFullYear(), new Date().getUTCMonth(), Number(day), 0, 0, 0)),
    end: getTime(new Date(new Date().getFullYear(), new Date().getUTCMonth(), Number(day), 23, 59, 59)),
  }
  // console.log(`https://pbs.twimg.com/hashflag/config-${year}-${month}-${day}-${hour}.json`)
  let hashflags = await getJSON(`https://pbs.twimg.com/hashflag/config-${year}-${month}-${day}-${hour}.json`)
  hashflags = hashflags.filter(item => item.startingTimestampMs >= toFilter.begin && item.startingTimestampMs <= toFilter.end)
  return hashflags;
}

async function postTweet(
  mediaID = null,
  tweet = "",
  reply = false,
  tweetID = null) {
try {
  const config = {};
  let tweet;
  if (mediaID) {
    config.media = {
      media_ids: [mediaID],
    };
  }
  if (reply) {
    const {data: createdTweet} = await TwitterClient.v2.reply(
        tweet,
        tweetID,
        {...config});
    tweet = createdTweet;
  } else {
    const {data: createdTweet} = await TwitterClient.v2.tweet(
        tweet,
        {...config});
    tweet = createdTweet;
  }
  return tweet;
} catch (error) {
  console.log(error);
  return null;
}
}

module.exports = functions
    .region("southamerica-east1")
    .https.onRequest(async (request, response) => {
      let hashflags = await getCurrentFlags();
      hashflags = [
        {
            "campaignName": "WB_Fantastic_Beasts_Dumbledore_2021_add",
            "hashtag": "AnimaisFantásticosNaHBOMax",
            "assetUrl": "https://abs.twimg.com/hashflags/WB_Fantastic_Beasts_Dumbledore_2021_add/WB_Fantastic_Beasts_Dumbledore_2021_add.png",
            "startingTimestampMs": "1652745600000",
            "endingTimestampMs": "1654696800000"
        },
        {
            "campaignName": "HBO_Max_Legendary_S3_May_2022",
            "hashtag": "BallorNothing",
            "assetUrl": "https://abs.twimg.com/hashflags/HBO_Max_Legendary_S3_May_2022/HBO_Max_Legendary_S3_May_2022.png",
            "startingTimestampMs": "1652760000000",
            "endingTimestampMs": "1660622340000"
        },
        {
            "campaignName": "Accessibility_Experience_Team_GAAD_2022",
            "hashtag": "GAAD",
            "assetUrl": "https://abs.twimg.com/hashflags/Accessibility_Experience_Team_GAAD_2022/Accessibility_Experience_Team_GAAD_2022.png",
            "startingTimestampMs": "1652760000000",
            "endingTimestampMs": "1672549200000"
        },
        {
            "campaignName": "Accessibility_Experience_Team_GAAD_2022",
            "hashtag": "GAAD2022",
            "assetUrl": "https://abs.twimg.com/hashflags/Accessibility_Experience_Team_GAAD_2022/Accessibility_Experience_Team_GAAD_2022.png",
            "startingTimestampMs": "1652760000000",
            "endingTimestampMs": "1672549200000"
        },
        {
            "campaignName": "Accessibility_Experience_Team_GAAD_2022",
            "hashtag": "GAAD22",
            "assetUrl": "https://abs.twimg.com/hashflags/Accessibility_Experience_Team_GAAD_2022/Accessibility_Experience_Team_GAAD_2022.png",
            "startingTimestampMs": "1652760000000",
            "endingTimestampMs": "1672549200000"
        },
        {
            "campaignName": "Accessibility_Experience_Team_GAAD_2022",
            "hashtag": "GlobalAccessibilityAwarenessDay",
            "assetUrl": "https://abs.twimg.com/hashflags/Accessibility_Experience_Team_GAAD_2022/Accessibility_Experience_Team_GAAD_2022.png",
            "startingTimestampMs": "1652760000000",
            "endingTimestampMs": "1672549200000"
        },
        {
            "campaignName": "Accessibility_Experience_Team_GAAD_2022",
            "hashtag": "GlobalAccessibilityAwarenessDay2022",
            "assetUrl": "https://abs.twimg.com/hashflags/Accessibility_Experience_Team_GAAD_2022/Accessibility_Experience_Team_GAAD_2022.png",
            "startingTimestampMs": "1652760000000",
            "endingTimestampMs": "1672549200000"
        },
        {
            "campaignName": "Accessibility_Experience_Team_GAAD_2022",
            "hashtag": "GlobalAccessibilityAwarenessDay22",
            "assetUrl": "https://abs.twimg.com/hashflags/Accessibility_Experience_Team_GAAD_2022/Accessibility_Experience_Team_GAAD_2022.png",
            "startingTimestampMs": "1652760000000",
            "endingTimestampMs": "1672549200000"
        },
        {
            "campaignName": "HBO_Max_Legendary_S3_May_2022",
            "hashtag": "LegendaryHBOMax",
            "assetUrl": "https://abs.twimg.com/hashflags/HBO_Max_Legendary_S3_May_2022/HBO_Max_Legendary_S3_May_2022.png",
            "startingTimestampMs": "1652760000000",
            "endingTimestampMs": "1660622340000"
        },
        {
            "campaignName": "HBO_Max_Legendary_S3_May_2022",
            "hashtag": "LegendaryMax",
            "assetUrl": "https://abs.twimg.com/hashflags/HBO_Max_Legendary_S3_May_2022/HBO_Max_Legendary_S3_May_2022.png",
            "startingTimestampMs": "1652760000000",
            "endingTimestampMs": "1660622340000"
        },
        {
            "campaignName": "HBO_Max_Legendary_S3_May_2022",
            "hashtag": "LegendaryOnMax",
            "assetUrl": "https://abs.twimg.com/hashflags/HBO_Max_Legendary_S3_May_2022/HBO_Max_Legendary_S3_May_2022.png",
            "startingTimestampMs": "1652760000000",
            "endingTimestampMs": "1660622340000"
        },
        {
            "campaignName": "HBO_Max_Legendary_S3_May_2022",
            "hashtag": "LegendarySeason3",
            "assetUrl": "https://abs.twimg.com/hashflags/HBO_Max_Legendary_S3_May_2022/HBO_Max_Legendary_S3_May_2022.png",
            "startingTimestampMs": "1652760000000",
            "endingTimestampMs": "1660622340000"
        },
        {
            "campaignName": "UCL_FINAL_May_2022",
            "hashtag": "UCLfinal",
            "assetUrl": "https://abs.twimg.com/hashflags/UCL_FINAL_May_2022/UCL_FINAL_May_2022.png",
            "startingTimestampMs": "1652745600000",
            "endingTimestampMs": "1654214400000"
        },
        {
            "campaignName": "UECL_FINAL_May_2022",
            "hashtag": "UECLfinal",
            "assetUrl": "https://abs.twimg.com/hashflags/UECL_FINAL_May_2022/UECL_FINAL_May_2022.png",
            "startingTimestampMs": "1652745600000",
            "endingTimestampMs": "1653955200000"
        },
        {
            "campaignName": "UEL_FINAL_May_2022",
            "hashtag": "UELfinal",
            "assetUrl": "https://abs.twimg.com/hashflags/UEL_FINAL_May_2022/UEL_FINAL_May_2022.png",
            "startingTimestampMs": "1652745600000",
            "endingTimestampMs": "1653350400000"
        },
        {
            "campaignName": "UWCL_FINAL_May_2022",
            "hashtag": "UWCLfinal",
            "assetUrl": "https://abs.twimg.com/hashflags/UWCL_FINAL_May_2022/UWCL_FINAL_May_2022.png",
            "startingTimestampMs": "1652745600000",
            "endingTimestampMs": "1653436800000"
        }
      ]
    const { 
      campaignName, 
      hashtag, 
      assetUrl, 
      startingTimestampMs, 
      endingTimestampMs
    } = hashflags[0]
      const image = await getBuffer(hashflags[0].assetUrl)
      // console.log(hashflags[0].assetUrl)
      GenerateImage({
        text: hashtag,
        image,
        textOptions: {
          fill: 'rgb(59, 130, 246)',
          stroke: 'white'
        }
      });
      response.send(hashflags)
    });

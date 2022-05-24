const functions = require("firebase-functions");
const generateImage = require("./generateImage");
const bent = require("bent");
const getBuffer = bent("buffer");
module.exports = functions
    .https.onRequest(async (request, response) => {
      functions.logger.info(request.body);
      const {
        // campaignName,
        hashtag,
        assetUrl,
        // startingTimestampMs,
        // endingTimestampMs,
      } = request.body;
      const config = {
        text: hashtag,
        textOptions: {
          fill: "rgb(59, 130, 246)",
          stroke: "white",
        },
      };
      config.image = await getBuffer(assetUrl);
      const newImage = await generateImage(config);

      response.send(`<img src="data:image/png;base64,${newImage.image.toString("base64")}">`);
    });

const sharp = require("sharp");
const {parse} = require("svgson");
const TextToSVG = require("text-to-svg");
const path = require("path");
const homeDir = __dirname.split("/");
homeDir.pop();
const fontsFolder = path.join(homeDir.join("/"), "fonts");
const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 675;
// const provaFolder = path.join(homeDir.join("/"), "prova");
/**
* Given a text and a few attributes, returns a text
* Does validation of asian characters.
* @param {object} params
* @return {object}
*/
async function createText(params) {
  let {fontSize,
    fontPath,
    text,
    textOptions: attributes} = params;
  if (!fontSize) {
    fontSize = 70;
  }
  if (!text) {
    return {err: "Text not found"};
  }
  if (!fontPath) {
    // Check if text has Japanese / Korean / Thai / Arabic letters
    if (text.match(/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/gmi)) {
      fontPath = "RocknRollOne-Regular.ttf";
    } else if (text.match(/[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff]/g)) {
      fontPath = "NotoSansKR-Medium.otf";
    } else if (text.match(/[\u0E00-\u0E7F]/g)) {
      fontPath = "IBMPlexSansThaiLooped-Medium.ttf";
    } else if (text.match(/[\u0600-\u06FF-\u0750-\u077F-\u0870-\u089F-\uFB50-\uFDFF-\uFE70-\uFEFF-\u10E60-\u10E7F-\u1EC70-\u1ECBF-\u1ED00-\u1ED4F-\u1EE00-\u1EEFF]/g)) {
      fontPath = "Almarai-Regular.ttf";
    } else {
      fontPath = "default.ttf";
    }
    fontPath = `${fontsFolder}/${fontPath}`;
  } else {
    fontPath = `${fontsFolder}/${fontPath}`;
  }
  // console.log("asd", fontPath)
  return new Promise((resolve, reject) => {
    TextToSVG.load(fontPath, async function(err, textToSVG) {
      if (err) reject(err);
      const options = {
        x: 0,
        y: 0,
        fontSize,
        anchor: "top",
        attributes,
      };
      // console.log("fontSize -->", fontSize);
      const svg = textToSVG.getSVG(text, options);
      // Check image boundaries
      const svgJson = await parse(svg);
      // console.log(svgJson);
      // console.log(svgJson.attributes.width, (CANVAS_WIDTH - 70));
      if (svgJson.attributes.width >= (CANVAS_WIDTH - 70)) {
        fontSize = fontSize - 10;
        resolve(createText({...params, fontSize}));
      } else {
        const image = Buffer.from(svg);
        const textSharp = await sharp(image).png();
        const {width, height} = await textSharp.metadata();
        const buffer = await textSharp.toBuffer();
        resolve({width, height, buffer});
      }
    });
  });
}
/**
* Generates an image from a object options
* @param {object} params Buffer da imagem para ser feito o upload.
* @return {object}
*/
async function createImage(params) {
  try {
    const {image} = params;
    const baseImage = sharp(image);
    const {width, height} = await baseImage.metadata();
    const buffer = await baseImage.toBuffer();
    return {width, height, buffer};
  } catch (error) {
    return error;
  }
}
module.exports = async function(params) {
  return new Promise(async function(resolve, reject) {
    try {
    // compositing and instanciate canvas
      const compositing = [];
      const canvasDimensions = {width: CANVAS_WIDTH, height: CANVAS_HEIGHT};
      // load assets
      const image = await createImage({...params});
      const text = await createText({...canvasDimensions, ...params});
      const credits = await createText({
        fontPath: "Nunito-SemiBold.ttf",
        fontSize: 20,
        text: "@hashflagsbot",
        textOptions: {
          fill: "#B6C8E0",
        },
      });
      // math positions
      const textPos = {
        top: Math.round((canvasDimensions.height - text.height) / 2),
        left: Math.round((canvasDimensions.width - text.width - image.width) / 2),
      };
      const imagePos = {
        top: Math.round((canvasDimensions.height - image.height) / 2),
        left: (textPos.left + text.width + 10) - image.width,
      };
      const creditsPos = {
        top: Math.round((canvasDimensions.height - credits.height) / 2 + text.height - 30),
        left: Math.round((canvasDimensions.width - credits.width) / 2),
      };
      // image instance
      compositing.push({
        input: image.buffer,
        top: imagePos.top,
        left: imagePos.left + (image.width / 1.5),
      });
      // text instance
      compositing.push({
        input: text.buffer,
        top: textPos.top,
        left: textPos.left - image.width / 2,
      });
      // credits instance
      compositing.push({
        input: credits.buffer,
        top: creditsPos.top,
        left: creditsPos.left,
      });
      // new blank image
      const sharpNewImage = {
        create: {
          width: canvasDimensions.width,
          height: canvasDimensions.height,
          channels: 3,
          background: {
            r: 239,
            g: 246,
            b: 255,
          },
        },
      };
      const newImage = sharp(sharpNewImage).png({quality: 100});
      // compositing
      newImage.composite(compositing);

      newImage.toBuffer((err, data, info) => {
        if (err) reject(err);
        resolve({image: data, info});
      });
    } catch (error) {
      if (error.err && error.err == "image right at boundaries") {
        error.params.fontSize = error.params.fontSize - 10;
        reject(error);
      }
    }
  });
};

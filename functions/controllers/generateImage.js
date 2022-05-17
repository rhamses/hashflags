const sharp = require('sharp')
const { parse }  = require('svgson')
const TextToSVG = require('text-to-svg');
const path = require('path')
const homeDir = __dirname.split("/")
homeDir.pop()
const fontsFolder = path.join(homeDir.join("/"), 'fonts')
const provaFolder = path.join(homeDir.join("/"), 'prova')
async function createText(params){
  let {fontSize, fontPath, width: canvasWidth, text, textOptions: attributes } = params
  if (!fontSize) {
    fontSize = 70
  }
  if(!canvasWidth) {
    canvasWidth = 1200 - 70 // canvasWidth - imageSize
  }
  if(!text) {
    reject({err: "Text not found"})
  }
  if(!fontPath){
    fontPath = `${fontsFolder}/default.ttf`
  }
  // console.log("asd", __dirname, path.relative(__dirname, ''))
  return new Promise((resolve, reject) => {
    TextToSVG.load(fontPath, async function(err, textToSVG) {
      if(err) reject(err)
      const options = {
        x: 0,
        y: 0,
        fontSize,
        anchor: 'top',
        attributes
      };
      const svg = textToSVG.getSVG(text, options);
      // Check image boundaries
      const svgJson = await parse(svg);
      // console.log(svgJson.attributes.width, canvasWidth)
      if(svgJson.attributes.width >= canvasWidth) {
        reject({err: "image right at boundaries", params: {...params, fontSize}})
      } else {
        const image = Buffer.from(svg)
        const text = await sharp(image).png()
        const { width, height } = await text.metadata()
        const buffer = await text.toBuffer()
        resolve( {width, height, buffer})
      }
    });
  })
}

async function createImage(params){
  try {
    let { image } = params;
    if(!image) {
      image = '../sharp/dv.png'
    }
    const baseImage = sharp(image)
    const { width, height } = await baseImage.metadata()
    const buffer = await baseImage.toBuffer()
    return {width, height, buffer}
  } catch (error) {
    return null
  }
}
module.exports = async function(params){
  try {
  // compositing and instanciate canvas
  const compositing = []
  const canvasDimensions = {width: 1200, height: 675};
  // load assets
  const image = await createImage({...params});
  const text = await createText({...canvasDimensions, ...params});
  const credits = await createText({
    fontPath: `${fontsFolder}/Nunito-SemiBold.ttf`,
    fontSize: 20,
    text: "@hashflagsbot",
    textOptions: {
      fill: '#B6C8E0'
    }
  })
  // math positions
  const textPos = {
    top: Math.round((canvasDimensions.height - text.height) / 2),
    left: Math.round((canvasDimensions.width - text.width - image.width) / 2)
  }
  const imagePos = {
    top: Math.round((canvasDimensions.height - image.height) / 2),
    left: (textPos.left + text.width + 10) - image.width
  }
  const creditsPos = {
    top: Math.round((canvasDimensions.height - credits.height) / 2 + text.height - 30),
    left: Math.round((canvasDimensions.width - credits.width) / 2)
  }
  // image instance
  compositing.push({
    input: image.buffer,
    top: imagePos.top,
    left: imagePos.left + (image.width / 1.5)
  })
  // text instance
  compositing.push({
    input: text.buffer,
    top: textPos.top,
    left: textPos.left - image.width / 2
  })
  // credits instance
  compositing.push({
    input: credits.buffer,
    top: creditsPos.top,
    left: creditsPos.left
  })
  // new blank image
  const sharpNewImage = {
    create: {
      width: canvasDimensions.width,
      height: canvasDimensions.height,
      channels: 3,
      background: {
        r: 239,
        g: 246,
        b: 255
      }
    }
  }
  const newImage = sharp(sharpNewImage).png()
  // compositing
  newImage.composite(compositing);
  // export
  newImage.toFile(`${provaFolder}/teste1.png`, (err) => {
    if(err) console.log(err)
  })
  } catch (error) {
    console.log(error)
    if(error.err && error.err == "image right at boundaries") {
      const fontSize = error.params.fontSize - 10;
      start({fontSize})
    }
  }
}

// start({
//   fontPath: './fonts/Lato-Bold.ttf',
//   text: 'コードギアス',
//   textOptions: {
//     fill: 'rgb(59, 130, 246)',
//     stroke: 'white'
//   }
// });
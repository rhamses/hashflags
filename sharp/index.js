const sharp = require('sharp')
const { parse }  = require('svgson')
const TextToSVG = require('text-to-svg');

async function createText(params){
  let {fontSize, width: canvasWidth} = params
  if (!fontSize) {
    fontSize = 90
  }
  if(!canvasWidth) {
    canvasWidth = 1200
  }
  return new Promise((resolve, reject) => {
    TextToSVG.load('./font.ttf', async function(err, textToSVG) {
      const attributes = {
        fill: 'rgb(59, 130, 246)', 
        stroke: 'white'
      };
      const options = {
        x: 0,
        y: 0,
        fontSize,
        anchor: 'top',
        attributes: attributes
      };
      const svg = textToSVG.getSVG('#DarthVader', options);
      // Check image boundaries
      const svgJson = await parse(svg);
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

async function createImage(){
  const image = sharp('dv.png')
  const { width, height } = await image.metadata()
  const buffer = await image.toBuffer()
  return {width, height, buffer}
}
async function start(params){
  try {
  // compositing and instanciate canvas
  const compositing = []
  const canvasDimensions = {width: 1200, height: 675};
  // load assets
  const image = await createImage();
  const text = await createText({...canvasDimensions, ...params});
  // math positions
  const textPos = {
    top: Math.round((canvasDimensions.height - text.height) / 2),
    left: Math.round((canvasDimensions.width - text.width - image.width) / 2)
  }
  const imagePos = {
    top: Math.round((canvasDimensions.height - image.height) / 2),
    left: (textPos.left + text.width + 10) - image.width
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
  newImage.toFile('teste.png', (err) => {
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

start();
// text();


/*
SVG PILL 
`<svg viewBox="0 0 280 80" xmlns="http://www.w3.org/2000/svg">
  <style>
    .pill {
      fill: rgb(59, 130, 246);
      stroke: #fff;
      stroke-width: .2
    }
    .text {
      fill: #fff;
      font-family: 'Arial';
      font-size: 16px
    }
  </style>
  <g>
    <rect class="pill" x="1" y="0" width="110" height="20" ry="10" rx="10" />
    <text class="text" x="10" y="15">#DarthVader</text>
  </g>
</svg>
`
*/
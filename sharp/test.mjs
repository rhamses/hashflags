import { replaceAllInString, replace } from 'svg-text-to-path';
import { JSDOM } from 'jsdom'
async function start(){
  console.log(await replaceAllInString(`<svg viewBox="0 0 993 80" xmlns="http://www.w3.org/2000/svg">
  <style>
    .text {
      fill: rgb(59, 130, 246);
      font-family: 'Arial';
      font-size: 80px;
      font-weight: bold
    }
    .rect {
      fill: rgba(255,0,0,0.2)
    }
  </style>
  <rect width="100%" height="100%" class="rect" />
  <text class="text" x="10" y="65">#DathVadeqopeumbcdklE</text>
</svg>`))

const dom = new JSDOM(`<svg viewBox="0 0 993 80" xmlns="http://www.w3.org/2000/svg">
<style>
  .text {
    fill: rgb(59, 130, 246);
    font-family: 'Arial';
    font-size: 80px;
    font-weight: bold
  }
  .rect {
    fill: rgba(255,0,0,0.2)
  }
</style>
<rect width="100%" height="100%" class="rect" />
<text class="text" x="10" y="65">#DathVadeqopeumbcdklE</text>
</svg>`)

console.log(await replace(dom.window.document, {group: false}))

}

start()
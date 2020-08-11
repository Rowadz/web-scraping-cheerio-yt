const { load } = require('cheerio')
const fetch = require('node-fetch')
const { writeFileSync } = require('fs')
const { generate } = require('shortid')
const DOMScrapperComposer = require('./Composer')

const init = async () => {
  const url =
    'https://github.com/MohammedAl-Rowad/Yedua/blob/code/Yedua-api/src/composers/DomScraper.ts'
  const htmlStr = await (await fetch(url)).text()
  const $ = load(htmlStr)
  writeFileSync(`./htmls/${generate()}-${Date.now()}.html`, $.html())
  const composer = new DOMScrapperComposer($)
  const json = composer.domToJSON()
  writeFileSync(
    `./jsons/${generate()}-${Date.now()}.json`,
    JSON.stringify(json, null, 2)
  )
}

init()

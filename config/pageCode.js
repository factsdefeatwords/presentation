const https = require('https')
const cheerio = require('cheerio')

function getPageCode(url) {
  return new Promise((resolve, reject) => {
    https.get(url, response => {
      response.setEncoding('utf8')
      let data = ''
      response.on('data', (chunk) => { data += chunk; })
      response.on('end', () => {
        try {
          //console.log(data)
          const $ = cheerio.load(data)
          const link = $.html('link')
          const style = $.html('style')
          const header = $.html('header')
          const subNav = $.html('header + div')
          const main = $.html('main')
          const footer = $.html('footer')
          let script_imports = $('body script[src]').toArray(), script_import = []
          let scripts = $('body script:not([src])').toArray(), script = ''
          
          scripts.forEach(el => {
            //console.log($(el).html())
            let html = $(el).html()
            let reg = /\/web-notification|google_|bat\.js|hotjar|addthis/
            if (!reg.test(html)) {
              script = `${script}\n${html}`
            }
          })
  
          script_imports.forEach(el => {
            let src = $(el).attr('src')
            let html = $.html(el)
            let reg = /nlj2\.js|affiliate\.js|conversion\.js|ga360-add\.js|nps|chatbot/
            if (!reg.test(html)) {
              script_import.push(src)
            }
          })

          resolve({
            staticDom: `${link}${style}${header}${subNav}${main}${footer}`,
            scripts: script_import,
            inlineScript: script
          })
  
        } catch (e) {
          reject(e.message)
        }
      })
    })
  })
}

module.exports = getPageCode
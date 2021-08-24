const https = require('https')
const cheerio = require('cheerio')

function getPageCode(url) {
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
        const main = $.html('main')
        const footer = $.html('footer')
        let script_imports = $('body script[src]').toArray(), script_import = ''
        let scripts = $('body script:not([src])').toArray(), script = ''
        
        scripts.forEach(el => {
          //console.log($(el).html())
          let html = $(el).html()
          let reg = /\/web-notification|google_|bat\.js|hotjar/
          if (!reg.test(html)) {
            script = `${script}\n${html}`
          }
        })

        script_imports.forEach(el => {
          let html = $.html(el)
          let reg = /nlj2\.js|affiliate\.js|conversion\.js|ga360-add\.js|nps|chatbot/
          if (!reg.test(html)) {
            script_import = `${script_import}\n${html}`
          }
        })
        
        return `${style}${link}${header}${main}${footer}${script_import}${script}`

      } catch (e) {
        console.error(e.message);
      }
    })
  })
}


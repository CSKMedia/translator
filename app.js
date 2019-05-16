const Koa = require('koa')
const KoaRouter = require('koa-router')
const path = require('path')
const render = require('koa-ejs')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')

const app = new Koa()
const router = new KoaRouter()

const port = 3000

// variabler
let sweText = ''
let robText = ''

// Bodyparser
app.use(bodyParser())

// serve static files
app.use(serve('./public'))

// View-engine option
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: false
})

// Router
app.use(router.routes()).use(router.allowedMethods())

// GET route
router.get('/', async ctx => {
  await ctx.render('index', {
    sweText: sweText,
    robText: robText
  })
})

// POST route
router.post('/translateToRobberLanguage', translateToRobberLanguage)
router.post('/translateToSwedishLanguage', translateToSwedishLanguage)

// function to translate to Robber Language
async function translateToRobberLanguage (ctx) {

  const body = ctx.request.body
  sweText = body.swe

  let consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z']
  let translatedText = ''

  for (let i = 0; i < sweText.length; i++) {
    let currentLetter = sweText[i]

    if (consonants.includes(currentLetter.toLowerCase())) {
      translatedText += (currentLetter + 'o' + currentLetter)
    } else translatedText += currentLetter
  }

  robText = translatedText

  ctx.redirect('/')
}

// function to translate to Swedish Language
// TODO : Fix reverse-translation (not working)
async function translateToSwedishLanguage (ctx) {
  const body = ctx.request.body
  robText = body.rob

  let translateText = robText
  let consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z']
  let result = ''

  for (let i = 0; i < translateText.length; i++) {
    let currentLetter = translateText[i]
    if (consonants.includes(currentLetter)) {
      // regExp från:  https://github.com/denizdogan/robber-language/blob/master/src/index.js
      result = translateText.replace(/([bcdfghjklmnpqrstvwxz])o\1/gi, '$1', currentLetter)
    }
  }

  sweText = result
  ctx.redirect('/')
}

app.listen(port, () => console.log('server is running on port: ' + port))

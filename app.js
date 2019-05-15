const Koa = require('koa')
const KoaRouter = require('koa-router')
const path = require('path')
const render = require('koa-ejs')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new KoaRouter()

const port = 3000

// variabler
let sweText = ''
let robText = ''

// Bodyparser
app.use(bodyParser())

// View-engine optionW
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true
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

  let vowels = ['a', 'o', 'u', 'å', 'e', 'i', 'ä', 'ö', ' ']
  let translatedText = ''
  for (let i = 0; i < sweText.length; i++) {
    let currentLetter = sweText[i]

    if (!vowels.includes(currentLetter) && isNaN(currentLetter)) {
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
  let vowels = ['a', 'o', 'u', 'å', 'e', 'i', 'ä', 'ö', ' ']

  for (let i = 0; i < translateText.length; i++) {
    let currentLetter = translateText[i]
    let index = translateText.indexOf(currentLetter)

    if (!vowels.includes(currentLetter)) {
      translateText = translateText.slice(index, index + 2)
    }
  }

  sweText = translateText
  ctx.redirect('/')
}

app.listen(port, () => console.log('server is running on port: ' + port))

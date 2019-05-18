const Koa = require('koa')
const KoaRouter = require('koa-router')
const path = require('path')
const render = require('koa-ejs')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')

const translation = require('./translation')

const app = new Koa()
const router = new KoaRouter()

const port = 3000

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
  cache: true,
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
router.post('/translateToRobberLanguage', (ctx) => {
  sweText = ctx.request.body.swe
  robText = translation.translateToRobberLanguage(sweText)
  ctx.redirect('/')
})

router.post('/translateToSwedishLanguage', (ctx) => {
  robText = ctx.request.body.rob
  sweText = translation.translateToSwedishLanguage(robText)
  ctx.redirect('/')
})

app.listen(port, () => console.log('server is running on port: ' + port))

const Koa = require('koa')
const KoaRouter = require('koa-router')
const path = require('path')
const render = require('koa-ejs')

const app = new Koa()
const router = new KoaRouter()

const port = 3000

// Router
app.use(router.routes()).use(router.allowedMethods())

// View-engine option
render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: false
})

// index
router.get('/', async ctx => {
  await ctx.render('index')
})

app.listen(port, () => console.log('server is running on port: ' + port))

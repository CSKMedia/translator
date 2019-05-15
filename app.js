const Koa = require('koa')
const KoaRouter = require('koa-router')

const app = new Koa()
const router = new KoaRouter()

const port = 3000

// Router
app.use(router.routes()).use(router.allowedMethods())

router.get('/', ctx => (ctx.body = 'testinga routers'))

app.listen(port, () => console.log('server is running on port: ' + port))

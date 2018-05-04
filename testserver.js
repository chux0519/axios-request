const Koa = require('koa')

const app = new Koa()

app.use(ctx => {
  console.log('===============================================')
  console.log(ctx.request)
  console.log('===============================================\n')
  ctx.body = {ok: true}
})

app.listen(3000, () => {
  console.log('listening on 3000 port')
})

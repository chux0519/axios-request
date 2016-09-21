import Koa from 'koa'

const app = new Koa()

app.use(ctx=>{
	console.log("===============================================")
	console.log(ctx.request)
	console.log("===============================================")
	ctx.body = {mediaId:"123456",foo:"bar"}
})

app.listen(3000,()=>{
	console.log("listening on 3000 port")
})
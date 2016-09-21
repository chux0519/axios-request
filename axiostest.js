import axios from 'axios'
import FormData from 'form-data'
import request from 'request'
import fs from 'fs'

let url = 'http://127.0.0.1:3000/'

// 方法一
// let data = fs.createReadStream(__dirname + '/test.jpg')
// axios.post(url,{media:data,type:"image"})
// .then(function (response) {
// 	console.log(response.data);
// })
// .catch(function (error) {
// 	console.log(error);
// })

// 方法一 plus
// let data = fs.createReadStream(__dirname + '/test.jpg')
// let header = {
// 	'content-type': 'multipart/form-data'
// }
// axios.post(url,{media:data,type:"image"},{headers:header})
// .then(function (response) {
// 	console.log(response.data);
// })
// .catch(function (error) {
// 	console.log(error);
// })


// // 方法二
// let data = fs.createReadStream(__dirname + '/test.jpg')
// let form = {
// 	type:"image",
// 	media:data
// }

// request.post({url:url,formData:form},(err,res,body)=>{
// 	if(err) console.log(err)
// 	console.log(body)
// })


// 方法三
// let data = fs.createReadStream(__dirname + '/test.jpg')
// let form = new FormData()
// form.append('type','image')
// form.append('media',data,'test.jpg')

// axios.post(url,form).then((response)=>{
// 	console.log(response.data)
// })
// .catch(e=>{console.log(e)})

// 方法四
// let data = fs.createReadStream(__dirname + '/test.jpg')
// let form = new FormData()
// form.append('type','image')
// form.append('media',data,'test.jpg')

// let header = {
// 	'content-type': 'multipart/form-data'
// }

// axios.post(url,form,{headers:header}).then((response)=>{
// 	console.log(response.data)
// })
// .catch(e=>{console.log(e)})

// 方法五
// let data = fs.createReadStream(__dirname + '/test.jpg')
// let form = new FormData()
// form.append('type','image')
// form.append('media',data,'test.jpg')

// axios.post(url,form,{headers:form.getHeaders()}).then((response)=>{
// 	console.log(response.data)
// })
// .catch(e=>{console.log(e)})


// 方法六
// let data = fs.createReadStream(__dirname + '/test.jpg')
// let form = new FormData()
// form.append('type','image')
// form.append('media',data,'test.jpg')
// form.getLength((err,length)=>{
// 	if(err) console.log(err)
// 	let headers = Object.assign({'Content-Length':length},form.getHeaders())
// 	axios.post(url,form,{headers:headers}).then((response)=>{
// 		console.log(response.data)
// 	})
// 	.catch(e=>{console.log(e)})
// })

// 最终方法
let data = fs.createReadStream(__dirname + '/test.jpg')
let form = new FormData()
form.append('type','image')
form.append('media',data,'test.jpg')

let getHeaders = (form=>{
	return new Promise((resolve,reject)=>{
		form.getLength((err,length)=>{
			if(err) reject(err)
			let headers = Object.assign({'Content-Length':length},form.getHeaders())
			resolve(headers)
		})
	})
})

getHeaders(form)
.then(headers=>{
	return axios.post(url,form,{headers:headers})
})
.then((response)=>{
	console.log(response.data)
})
.catch(e=>{console.log(e)})
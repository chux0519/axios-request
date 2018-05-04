const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const path = require('path')
const {promisify} = require('util')

function buildForm (file) {
  const data = fs.createReadStream(file)
  const form = new FormData()
  form.append('type', 'image')
  form.append('media', data, 'test.jpg')
  return form
}

async function getFormHeaders (form) {
  const getLen = promisify(form.getLength).bind(form)
  const len = await getLen()
  return {
    ...form.getHeaders(),
    'Content-Length': len
  }
}

async function main () {
  const img = path.join(__dirname, './test.jpg')
  const url = 'http://127.0.0.1:3000/'

  const form = buildForm(img)
  const headers = await getFormHeaders(form)
  return axios.post(url, form, {headers: headers})
}

main().then(console.log).catch(console.error)

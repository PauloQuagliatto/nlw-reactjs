const path= require('path')
const express = require('express')

const port =  process.env.PORT || 8080

const app = express()

const publicPath = path.join(__dirname, '..', '/build')

app.use(express.static(publicPath))

app.get('*', (req, res) => {
  res.sendFile('/index.html', { publicPath })
})

app.listen(port, () => {
  console.log('server is running')
})
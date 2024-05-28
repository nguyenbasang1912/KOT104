require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const { ErrorResponse } = require('./helpers/responseHandle')
const { handleError } = require('./helpers/handError')
const connect = require('./configs/connectDb')
const PORT = process.env.PORT || 5000
const cors = require('cors')
const rootRouter = require('./routes')

// init middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// init router
app.use('', rootRouter)
app.get('/hello', (req, res) => {
  const { keyword } = req.query
  console.log(keyword)
  res.send('sss')
} )

// handle error
app.use(_ => {
  throw new ErrorResponse({ status: false, message: '404 not found', code: 404 })
})

app.use(handleError)

connect().then(() => {
  console.log("Connect database sucess")
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}).catch(() => {
  console.log(`Faild to connect`)
})
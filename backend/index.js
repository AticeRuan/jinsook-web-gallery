require('dotenv').config()
const express = require('express')
const artworkRoutes = require('./routes/artworks')
const userRoutes = require('./routes/user')
const messageRoutes = require('./routes/messages')
const mongoose = require('mongoose')
const cors = require('cors')
const serverless = require('serverless-http')

const app = express()

app.use(express.json())

app.use(
  cors({
    origin: [
      'https://jinsook-web-gallery-fontend.vercel.app',
      'http://localhost:5173',
    ],
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'],
  }),
)

app.use('/api/artworks', artworkRoutes)
app.use('/api/users', userRoutes)
app.use('/api/messages', messageRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Jinsook Gallery on Vercel!' })
})

//connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running on port ${process.env.PORT}`)
    })
  })
  .catch((err) => console.log(err))

module.exports = app
module.exports.handler = serverless(app)

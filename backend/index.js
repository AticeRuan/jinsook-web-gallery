require('dotenv').config()
const express = require('express')
const artworkRoutes = require('./routes/artworks')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')
const cors = require('cors')
const serverless = require('serverless-http')

const app = express()

console.log('Starting server...')
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'Not Set')

app.use(
  cors({
    origin: ['https://jinsook-frontend.vercel.app'],
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'],
  }),
)

app.use(express.json())

app.options('*', cors())

app.get('/test', (req, res) => {
  console.log('Test route accessed')
  res.json({ message: 'Test route working!' })
})

app.use('/api/artworks', artworkRoutes)
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Jinsook Gallery on Vercel!' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error handler:', err.stack)
  res.status(500).send('Something broke!')
})

const mongoUri = process.env.MONGO_URI
if (!mongoUri) {
  console.error('MONGO_URI is not defined')
  process.exit(1)
}
//connect to mongodb
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB')
    //listen for requests
    if (!process.env.LAMBDA_TASK_ROOT) {
      app.listen(process.env.PORT || 4000, () => {
        console.log(`Server is running on port ${process.env.PORT}`)
      })
    }
  })
  .catch((err) => console.log(err))

module.exports = app
module.exports.handler = serverless(app)

require('dotenv').config()
const express = require('express')
const artworkRoutes = require('./routes/artworks')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
  }),
)

app.use('/api/artworks', artworkRoutes)
app.use('/api/users', userRoutes)

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

var express = require('express')
var app = express()

// For env file
require('dotenv').config()

// For Cors
var cors = require('cors')
app.use(cors())

const routes = require('./routes/index')

app.use(express.json())

// routes
app.use('/api', routes)

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`)
})

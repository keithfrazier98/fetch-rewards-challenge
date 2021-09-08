const path = require("path")

require('dotenv').config({path:path.join(__dirname,"..",".env")})

const express = require('express')
const cors = require('cors')
const app = express()

const pointsRouter = require('./points/points.router')

app.use(cors())
app.use(express.json())

app.use('/', pointsRouter)



module.exports = app

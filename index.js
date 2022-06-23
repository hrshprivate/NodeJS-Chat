const { json, urlencoded } = require('body-parser')
const express = require('express')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 5000

app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())

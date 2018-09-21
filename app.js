const express = require('express')
const morgan = require('morgan')
const app = express()
const html = require('html-template-tag')
const main = require('./views/main.js')
/* const sequelize = require('sequelize')
const db = new Sequelize('') */

app.use(morgan('dev'))
app.use(express.static(__dirname + "/public"))

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (req, res) => {
    res.send(main(''))
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`)
})
const express = require('express')
const morgan = require('morgan')
const app = express()
const main = require('./views/main.js')
const { db } = require('./models');

app.use(morgan('dev'))
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (req, res) => {
    console.log('hello');
    res.send(main(''))
})

db.authenticate().
then(() => {
  console.log('connected to the database');
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`)
})

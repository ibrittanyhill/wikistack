const express = require('express')
const morgan = require('morgan')
const app = express()
const main = require('./views/main');
const { db, ...models } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');


app.use(morgan('dev'))
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())



app.get('/', (req, res) => {
    console.log(db);
    res.send(main(''))
})

async function init() {
    await db.sync({force: true})
    await db.sync()

    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`App listening in port ${PORT}`)
    })
}

init()

db.authenticate().
    then(() => {
        console.log('connected to the database');
    })



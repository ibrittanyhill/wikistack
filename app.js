const express = require('express')
const morgan = require('morgan')
const app = express()
const main = require('./views/main');
const { db, ...models } = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan('dev'))
app.use('/wiki', wikiRouter);
app.use('/user', userRouter);
app.use(express.static(__dirname + "/public"))


app.get('/', async (req, res) => {
    const posts = await models.Page.findAll()
    console.log(posts)
    res.send(main(posts))
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



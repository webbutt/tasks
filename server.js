if(process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.set('views', __dirname+ '/views')

const indexRouter = require('./routes/index')

app.use(express.urlencoded({limit: '50mb', extended: false}));

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('DB CONNECTED'))

app.use(express.static('dist'))

app.use('/', indexRouter)

app.listen(process.env.PORT || 4000)
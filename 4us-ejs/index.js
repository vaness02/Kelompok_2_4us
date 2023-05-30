const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose')
const app = express()


app.use('/public',express.static('public'));
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(session({
    secret: 'som3_secret_keys',
    cookie: {}
}))

app.use((request, response, next) => { 
    response.locals.isLoggedIn = request.session.isLoggedIn;
    next();
})

app.use((request, response, next) => { 
    response.locals.isUpdateShop = request.session.isUpdateShop;
    next();
})

mongoose.connect(('mongodb+srv://marioaero:marioaero@cluster1.hba20.mongodb.net/4us_database?retryWrites=true&w=majority')
    , (error, response) => {
        if (error) {
            console.error(error);
        }
        else{
            console.log('Database terhubung !')
        }
    })
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const { request, response } = require('express');
const port = process.env.PORT || 3000
app.use('/', indexRouter);
app.use('/user', userRouter);
//port 
app.listen(port, ()=> {
    console.log('server sudah berjalan ')
})
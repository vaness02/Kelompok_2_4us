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

mongoose.connect(('mongodb+srv://marioaero:marioaero@cluster1.hba20.mongodb.net/4us_database?retryWrites=true&w=majority')
    , (error, response) => {
        if (error) {
            console.error(err);
        }
        else{
            console.log('Database terhubung !')
        }
    })
    
    //seeding



const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const { request, response } = require('express');


app.use('/', indexRouter);
app.use('/user', userRouter);
//port 
app.listen('3000', ()=> {
    console.log('server sudah berjalan di port 3000')
})
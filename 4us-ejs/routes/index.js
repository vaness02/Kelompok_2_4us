const { request, response } = require('express');
const express = require('express');
const Product = require('../models/product');
const user = require('../models/user');
const router = express.Router()

router.get('/', (request, response) => {
    response.render('pages/index');
})
router.get('/homepage', (request, response) => {
    response.render('pages/index');
})
router.get('/about', (request, response) => {
    response.render('pages/about');
})
router.get('/checkout', (request, response) => {
    response.render('pages/checkout');
})
router.get('/payment', (request, response) => {
    response.render('pages/payment');
})
router.get('/contact', (request, response) => {
    response.render('pages/contact');
})
router.get('/signin', (request, response) => {
    response.render('pages/signin');
})
router.get('/signup', (request, response) => {
    response.render('pages/signup');
})
router.get('/shop', async (request, response) => {
    var data = await Product.find();
    response.render('pages/shop', {products: data});
})
router.get('/tambahdata', (request, response) => {
    response.render('pages/tambahdata');
})
router.get('/Hapusdata', (request, response) => {
    response.render('pages/Hapusdata');
})
router.get('/dashboard',async (request, response) => {
    var data = await Product.find();
    response.render('pages/dashboard', {products: data});
})
  
router.get('/EditData/:id', (request, response, next) => {
    console.log(request.params.id);
    // res.send(req.params.id);
    Product.findOneAndUpdate({_id: request.params.id},request.body, { new: true }, (err, shop)=>{
        console.log(shop);
        
        console.log(shop.name);
        
        // console.log(docs._id);
        
        response.render('pages/EditData', {Product:shop});
    })
});


router.post('/EditData/:id', (request, response, next) => {
   
    
    Product.findByIdAndUpdate({_id: request.params.id},request.body, (err)=>{
        if (err) {
            console.log(err);
            next(err);
        } else {
            response.redirect('/dashboard');
        }
    })
});

module.exports = router;
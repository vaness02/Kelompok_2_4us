const { request, response } = require('express');
const express = require('express');
const cart = require('../models/cart');
const Product = require('../models/product')
const Cart = require('../models/cart')
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
router.get('/login', (request, response) => {
    response.render('pages/login');
})
router.get('/signup', (request, response) => {
    response.render('pages/signup');
})
router.get('/shop', async (request, response) => {
    var data = await Product.find();
    response.render('pages/shop', {products: data});
})

router.get('/add-to-cart/:id', function(request, response, next) {
        var productId = req.params.id;
        var cart = new cart(req.session.cart ? req.session.cart : {items: {}});

        Product.findById(productId, function(error, product) {
            if (error) {
                return response.redirect('/');
            }
            cart.add(product, product.id);
            req.session.cart = cart;
            console.log(request.session.cart);
            response.redirect('/')
        });
});


module.exports = router;
const express = require('express');
const product = require('../models/product');
const User = require('../models/user')
const router = express.Router();

router.get('signin', async (request, response) => {
    response.render('pages/signin')
})
router.get('/logout', (request, response) => {
    request.session.isLoggedIn = false;
    response.redirect('/')
})
router.post('/signin', async(request, response) => {
    const Name = request.body.Name;
    const Email = request.body.Email;
    const Telephone = request.body.Telephone;
    const Password = request.body.Password;
    console.log(Name,Email,Telephone,Password);
    data = await User.find();
    await data.forEach((account) => {
        if (Email != account.email ){
            response.render('pages/signin', { error: 'Email Salah!'})
        }
        if (Password != account.password ){
            response.render('pages/signin', { error: 'Password Salah'})
        }
        if(account.name == "admin" && account.email == "admin@admin.com"){
            response.redirect('/Dashboard');
        }

    })
    request.session.isLoggedIn = true;
            response.redirect('/');
    
    
})
router.post('/register', async(request, response) => {
    const name =  request.body.name;
    const email = request.body.email;
    
    data = await User.find();
    await data.forEach((account) => {
        if (email == account.email){
            response.render('pages/signup', { error: 'Email atau sudah terdaftar !'})
        }else{
        if (name == account.name){
            response.render('pages/signup', { error: 'Nama sudah Digunakan !'})
        }
    }
    })
    const telephone = request.body.telephone;
    const password = request.body.password;
    const confirmpassword = request.body.confirmpassword;

    if(password != confirmpassword){
        response.render('pages/signup', { error: 'Password tidak sama!'})
    } else {
        const user = new User({
            name: name,
            email: email,
            telephone: telephone,
            password: password,
            confirmpassword: confirmpassword
        })
        await user.save((error, response) => {
            if (error) console.error(error);
            else {
                console.log('Sign In Succesfull!');
                
            }
        })
        request.session.isLoggedIn = true;
                response.redirect('/');
    }
}) 
//tambah-data
router.post('/tambahdata', async(request, response) => {
    const NameProduct =  request.body.NameProduct;
    const imagePath = request.body.linkImage;
    const Price = request.body.Price;
    data = await product.find();
    await data.forEach((shop) => {
        if (NameProduct == shop.name){
            response.render('pages/tambah-data', { error: 'Nama produk sudah ada!'})
        }
    })
        const products = new product({
            imagePath: imagePath,
            name: NameProduct,
            price: Price,
        })
        await products.save((error, response) => {
            if (error) console.error(error);
            else {
                console.log('Produk telah diTambahkan');
                
            }
        })
        request.session.isUpdateShop = true;
                response.redirect('/Dashboard');
    }) 
    router.get('/delete/:id', (request, response) => {
        product.findByIdAndDelete(request.params.id, (err) => {
            if(!err){
                response.redirect("/dashboard");
                console.log('Produk telah di hapus')
            }
            else {
                console.log(err);
            }
        })
    })
    

    
    
    //edit
   /* router.get('/update/:id',(request, response) => {
        product.findById(request.params.id, (err) => {
            if(!err){
                product.imagePath = request.body.linkImage;
                product.name = request.body.NameProduct;
                product.price = request.body.Price;

                product.save();
                console.log('Produk telah diTambahkan');
            }
            else {
                console.log(err);}
        })
    })
*/
    
/*router.post('/EditData', async(request, response) => {
    const NameProduct =  request.body.NameProduct;
    const Price = request.body.Price;
    data = await product.find();
    await data.forEach((shop) => {
        if (NameProduct == shop.name){
            response.render('pages/tambah-data', { error: 'Nama produk sudah ada!'})
        }
    })
        const products = new product({
            imagePath: imagePath,
            name: NameProduct,
            price: Price,
        })
        await products.save((error, response) => {
            if (error) console.error(error);
            else {
                console.log('Produk telah diTambahkan');
                
            }
        })
        request.session.isUpdateShop = true;
                response.redirect('/shop');
    }) */
module.exports = router;
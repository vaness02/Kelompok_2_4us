const express = require('express');
const User = require('../models/user')
const router = express.Router();

router.get('login', async (request, response) => {
    response.render('pages/login')
})
router.get('/logout', (request, response) => {
    request.session.isLoggedIn = false;
    response.redirect('/')
})
router.post('/login', (request, response) => {
    const Name = request.body.Name;
    const Email = request.body.Email;
    const Telephone = request.body.Telephone;
    const Password = request.body.Password;
    console.log(Name,Email,Telephone,Password);
    if (Name == "admin" && Email == "admin@admin.com" && Telephone == "123" && Password == "123") {
        request.session.isLoggedIn = true;
            response.redirect('/')
    }else{
        response.render('pages/login', { error: 'Akun anda Belum terdaftar!'})
    }
})
router.post('/register', async(request, response) => {
    const name =  request.body.name;
    const email = request.body.email;
    
    data = await User.find();
    await data.forEach((account) => {
        if (email == account.email){
            response.render('pages/signup', { error: 'Email sudah terdaftar !'})
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

module.exports = router;
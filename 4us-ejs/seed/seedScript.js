//mengupload produk2 yang dijual ke dalam database
const Product = require('../models/product')
const mongoose = require('mongoose');


mongoose.connect(('mongodb+srv://marioaero:marioaero@cluster1.hba20.mongodb.net/4us_database?retryWrites=true&w=majority')
    , (error, response) => {
        if (error) {
            console.error(err);
        }
        else{
            console.log('Database terhubung! untuk seeding')
        }
    })
const products = [
    new Product ({
        imagePath: "https://i.ibb.co/jMZ3zWK/s1.png",
        name: 'Air Force 1 shadow',
        price: '1'
    }),
    new Product ({
        imagePath: "https://i.ibb.co/YDJTLRp/s2.jpg",
        name: 'Air Force 1 Low G-Dragon',
        price: '1'
    }),
    new Product ({
        imagePath: "https://i.ibb.co/VxxBnQM/s3.jpg",
        name: 'PENROSE HEEL',
        price: '1'
    }),
    new Product ({
        imagePath: "https://i.ibb.co/jyyD39w/s4.jpg",
        name: 'Shuberry Heels',
        price: '1'
    }),
    new Product ({
        imagePath: "https://i.ibb.co/Q6Y6YPn/s5.jpg",
        name: 'ADIDAS NMD ',
        price: '1'
    }),
    new Product ({
        imagePath: "https://i.ibb.co/WVwdVM1/s6.jpg",
        name: 'Adidas Running Shoes ',
        price: '1'
    }),
    new Product ({
        imagePath: "https://i.ibb.co/tKXRKxS/s7.jpg",
        name: 'prima Classe Carol ',
        price: '1'
    }),
    new Product ({
        imagePath: "https://i.ibb.co/48SP5Dz/s8.jpg",
        name: 'Nike Football Shoes',
        price: '1'
    }),
    new Product ({
        imagePath: "https://i.ibb.co/Srv8DYX/s9.jpg",
        name: 'Adidas Ultraboost x Lego',
        price: '1'
    }),
  
]
var done = 0
for (var i = 0; i < products.length; i++) {
    products[i].save((error, response) => {
        done++;
        if(done == products.length){
            console.log('Produk Berhasil di Upload !')
            exit();
        }
    })
}

    function exit()
    {
        mongoose.disconnect();
    }
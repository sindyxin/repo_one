const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

app.use(express.static(__dirname + '/product/dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/product_manager');

const ProductSchema = new mongoose.Schema({
    // product_id:{type:Number},
    title: { type: String, minlength:4, required: true },
    price: { type: String, required: true },
    img: { type:String, required: false },

})
let Product = mongoose.model('Product', ProductSchema);

app.post('/api/product/new', (req, res)=>{
    let newProduct = new Product({title: req.body.title, price: req.body.price, img: req.body.img});
    newProduct.save((err)=>{
        if(err){
            console.log("server new product err", err);
            res.json(err);
        }else{
            console.log("server create new successful", newProduct);
            res.json(newProduct);
        }
    })
})
app.get('/api/product',(req, res)=>{
   Product.find({},(err, allProducts)=>{
       if(err){
           console.log("server get all products", err);
           res.json(err);
       }else{
           console.log("server get all products successful", allProducts);
           res.json(allProducts);
       }
   })
})
app.get('/api/product/:id', (req, res)=>{
    Product.findOne({_id:req.params.id}, (err, findOneProduct)=>{
        if(err){
            console.log("get one from server wrong", err);
            res.json(err);
        }else{
            console.log("get one right", findOneProduct);
            res.json(findOneProduct);
        }
    })
})
app.put('/api/product/edit/:id', (req, res)=>{
    Product.findOne({_id:req.params.id}, (err, findOneProduct)=>{
        if(err){
            console.log("put process get one from server wrong", err);
            res.json(err);
        }else{
            findOneProduct.title = req.body.title;
            findOneProduct.price = req.body.price;
            findOneProduct.img = req.body.img;
            findOneProduct.save((err)=>{
                if(err){
                    console.log("save put process get one from server wrong", err);
                    res.json(err);
                }else{
                    console.log("update edit in server", findOneProduct);
                    res.json(findOneProduct);
                }
            })
        }
    })

})
app.delete('/api/product/:id', (req, res)=>{
    Product.remove({_id:req.params.id}, (err)=>{
        if(err){
            console.log("delete in server wrong", err);
            res.json(err);
        }else{
            res.json({messgae:'success'})
        }
    })
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./product/dist/index.html"))
});

app.listen(4200, ()=>{
    console.log("listen 4200 port");
})
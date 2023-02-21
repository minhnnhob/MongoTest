var express = require('express');

var app = express()

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

var url = 'mongodb://127.0.0.1:27017';
var MongoClient = require('mongodb').MongoClient;

app.get('/',async(req,res)=>{
    let client = await MongoClient.connect(url)// doi cau lenh nay chay xong moi chay cac cau sau
    let dbo = client.db("GCH1005")
    let products = await dbo.collection("products").find().toArray()
    res.render('main',{'products':products})
})

const PORT =  process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log("okehehe")
})
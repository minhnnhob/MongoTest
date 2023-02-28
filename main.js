var express = require('express');
const { ObjectId } = require('mongodb');

var app = express()

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

var url = 'mongodb+srv://Minh123:Minh123@cluster0.qyevixf.mongodb.net/test';
var MongoClient = require('mongodb').MongoClient;

app.post('/add',async (req,res)=>{
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picURL = req.body.picURL

    if(name.length <= 5){
        res.render('add',{name_err: 'it chu the, danh it nhat 5 chu vao'})
        return
    }


    const newProduct = {
        'name' : name,
        'price' : price,
        'picURL' : picURL
    }
    let client = await MongoClient.connect(url)
    let dbo = client.db("GCH1005")
    await dbo.collection("products").insertOne(newProduct)
    res.redirect("/")
})

app.get('/add',(req,res)=>{
    res.render('add')
})

app.get('/delete/:id',async (req,res)=>{
    const id = req.params.id
    let client = await MongoClient.connect(url)
    let dbo = client.db("GCH1005")
    await dbo.collection("products").deleteOne({"_id":new ObjectId(id)})
    res.redirect("/")
})

app.get('/edit/:id', async (req,res)=>{
    const id = req.params.id
    let client = await MongoClient.connect(url)
    let dbo = client.db("GCH1005")
    const prod= await dbo.collection("products").findOne({"_id":new ObjectId(id)})
    res.render('edit',{prod:prod})
})

app.post('/edit',async (req,res)=>{
    const id = req.body.id
    const name = req.body.txtName
    const price = req.body.txtPrice
    const picURL = req.body.picURL
    let newValues ={ $set : {name: name,price:price, picURL:picURL}};

    let client = await MongoClient.connect(url)
    let dbo = client.db("GCH1005")
    await dbo.collection("products").updateOne({"_id":new ObjectId(id)},newValues)
    res.redirect("/")
})

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
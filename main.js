var express = require('express')
var app = express()

app.set('view engine','hbs')
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.render('main')
})

const PORT =    process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log("okehehe")
})
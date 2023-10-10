const express = require('express')
const mongoose = require('mongoose')
//const Product = require('./models/productmodel')
const app = express()


app.use(express.json())

//routes
app.get('/', (req,res) => {
    res.send('hello Node game')
})

mongoose.connect('mongodb+srv://kayannalaster:PASSWORDHEREPLEASE@cluster0.poaa9nu.mongodb.net/UserDB?retryWrites=true&w=majority')
.then(() => {
    console.log('connected')
    app.listen(3000, () => {
        console.log("Node api app is running on port 300")
    }) 
}).catch((error) => {
    console.log(error)
})
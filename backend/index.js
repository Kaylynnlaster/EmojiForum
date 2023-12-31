const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');


const app = express()
// Use CORS middleware
app.use(cors());
const UserRouter = require('./api/User')
const ThreadRouter = require('./api/Thread')
const CommentRouter = require('./api/Comment')

app.use(express.json())

app.use('/user/', CommentRouter)
app.use('/user/', ThreadRouter)
app.use('/user', UserRouter)


//routes
app.get('/', (req,res) => {
    res.send('hello Node game')
})

mongoose.connect('mongodb+srv://kayannalaster:Animazing2023@cluster0.poaa9nu.mongodb.net/UserDB?retryWrites=true&w=majority')
.then(() => {
    console.log('connected')
    app.listen(3000, () => {
        console.log("Node api app is running on port 300")
    }) 
}).catch((error) => {
    console.log(error)
})
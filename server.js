const express =  require('express')

const MongoDb = require('../db/MongoDb')
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const app = express();
const port = process.env.PORT

MongoDb();

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.use('/api', userRoutes)
app.use('/api', postRoutes) 
app.use('/api', KycRoutes)


app.listen(5000, ()=> console.log('listening on ${port}' ))

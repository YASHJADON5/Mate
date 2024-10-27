require('dotenv').config();
const express= require('express')
const mainRouter= require('./routes/index')
const {connectMongoose}=require('./db')

const app= express();

const cors= require("cors")

app.use(cors());

app.use(express.json());

app.use('/api/v1', mainRouter);



app.listen(3000,()=>{
    console.log("server is listening")
}) 

connectMongoose()




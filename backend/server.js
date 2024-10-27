require('dotenv').config();
const express=require('express');
const mainRouter=require('./routes/index');
const { connectMongoose }=require('./db');

const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use('/api/v1',mainRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}`);
});

connectMongoose();


const express= require('express');
const {user} = require('../db')
const jwtKey= process.env.JWT_KEY;
const jwt = require('jsonwebtoken')
const auth= require('../middleware/auth')

const userRouter= express.Router();

const {z}= require('zod')

const singupBody= z.object({
    name:z.string(),
    password:z.string(),
    email:z.string()
})

const singinBody= z.object({
    email:z.string(),
    password:z.string()
})


userRouter.post('/signup',async(req,res)=>{

    try{

        const body= req.body;

        const {success} = singupBody.safeParse(body);

        if(!success){
            return res.json({
                msg:"body is erronus or body is missing"
            })
        }

        const existingUser= await user.findOne({
            email:req.body.email
        })
  
         if(existingUser){
          return res.status(411).send({
              message:"user already exist"
          })
        }

        const User=await user.create({
            fullname:req.body.name,
            email:req.body.email,
            password:req.body.password,

        })

        const token= jwt.sign({id:User._id},jwtKey)

        res.status(200).send({
            message:"account created successfully",
            token:token
        })
    


    }
    catch(err){
        console.log( "the error is "+err)
        res.send(err);
    }

})


userRouter.post('/signin',async(req,res)=>{
   try{
    const {success}= singinBody.safeParse(req.body);

    if(!success){
        return res.json({
            msg:"body is erronus or body is missing"
        })
    }

    const existingUser= await user.findOne({
        email:req.body.email
    })

     if(!existingUser){
      return res.status(411).send({
          msg:"user does not exist"
      })
    }


    const isPasswordCorrect= existingUser.password===req.body.password

    if(!isPasswordCorrect){
        return res.status(401).send({
            message: "password is wrong",
        });
    }

    const token = jwt.sign({ id: existingUser._id }, jwtKey, { expiresIn: '48h' });


    res.status(200).send({
        message: "Sign-in successful",
        token: token,
    });
}
    catch(err){
        console.error("Error during sign-in:",err);
        return res.send(err);
    }

})


userRouter.get('/bulk',auth,async(req,res)=>{
    try{
     
        const response= await user.find()

        if(!response ){
            return res.json({
                msg:"no users found"
            })
        }
        
        return res.json(response)

 
 }
     catch(err){
         console.error("Error fetching all users",err);
         return res.send(err);
     }
 
 })
 







module.exports= userRouter;
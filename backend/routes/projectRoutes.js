
const express= require('express');
const {z}= require('zod')
const {project,user} = require('../db')
const auth= require('../middleware/auth')

const projectBody= z.object({
    title:z.string(),
    description:z.string(),
})


const projectRouter= express.Router();


projectRouter.post('/createproject',auth,async(req,res)=>{

    try{

        const {success,error}= projectBody.safeParse(req.body);

        if(!success){
            return res.json({
                msg:"error in project body",
                err:error
            })
        }
        // const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        // let date= new Date();
        // let month= months[date.getMonth()];
        // let day= date.getDate();
        // let year=date.getFullYear();

        // const finalDate= `${month} ${day}, ${year} `

         console.log(req.id);
        const result = await project.create({
            title:req.body.title,
            description:req.body.description,
            creator:req.id,
        })

        



        res.status(200).send({
            message:"project created successfully",
        })

         

    }
    catch(err){
        console.log("err while creating project", err);
    }

})

projectRouter.get('/singleproject/:id',auth,async(req,res)=>{
     
    const projectId = req.params.id;

    try{

        const response =await project.findOne({ _id:projectId });

        if (!response) {
            return res.status(404).json({ message:'Project not found' });
        }

        res.status(200).json(response);

    }
    catch(err){
        console.log("err while fethching single project", err);
    }

})


projectRouter.get('/bulkprojects',auth,async(req,res)=>{
  
    const id = req.id;

    try{
        const response = await project.find({
            creator:req.id
        })

        console.log(response)

        res.status(200).json(response);

    }
    catch(err){
        console.log("err while fethching bulk project", err);
    }
     

})


projectRouter.put('/updateproject/:id',auth,async(req,res)=>{

    try{
        const projectId= req.params.id;
        const {success}= projectBody.safeParse(req.body)
        if(!success){
           return  res.json({
                msg: "update project body erronous"
            })
        }
        
        const response = await project.updateOne(
            { _id: projectId },
            {
            title:req.body.title,
            description:req.body.description
            }
        )

        console.log(response)

        res.status(200).json(response);

    }
    catch(err){
        console.log("err while updating project details", err);
    }

})

projectRouter.delete('/deleteproject/:id',auth,async(req,res)=>{

    try{
        const projectId= req.params.id;
       
        const response = await project.deleteOne({
            _id:projectId
        })

        console.log(response)

        res.status(200).json({
            msg:"deleted successfully"
        });

    }
    catch(err){
        console.log("err while updating project details", err);
    }

})








module.exports= projectRouter;
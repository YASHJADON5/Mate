
const express= require('express');
const {z}= require('zod')
const auth= require('../middleware/auth')
const {task, project,user}= require ('../db')




const taskRouter= express.Router();


const taskBody = z.object({
    title: z.string(),
    description: z.string(),
    status: z.string(),
    projectId: z.string(),
    assignedToId: z.string(),
    remarks: z.array(z.string())
});


const taskUpdateBody = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    status: z.string().optional(),
    remarks: z.string().optional()
});

const updateuserspecificTaskBody= z.object({
    id:z.string(),
    remarks:z.string(),
    status:z.string()
})

taskRouter.post('/create',auth,async(req,res)=>{

    try{
        const {success,error} = taskBody.safeParse(req.body);
        if(!success){
            console.log(error)
            return res.json({
                msg:"body parsing failed in creating task"
            })
        }
        const {projectId} =req.body;
        const response= await task.create({
            title:req.body.title,
            description:req.body.description,
            status:req.body.status,
            project:projectId,
            assignedTo:req.body.assignedToId,
            remarks:req.body.remarks
        })

        await project.updateOne({
            _id:projectId
        }, { $push: { tasks: response._id } })
        await user.updateOne({
            _id:req.body.assignedToId
        }, { $push: { tasks: response._id } })

        return res.json({
            msg:"task created",
            response:response
        })

    }
    catch(err){
        console.log("error while creating task",err)

    }

})

taskRouter.get('/projectspecifictask/:id', auth, async (req, res) => {
    try {
        console.log(req.params.id)
        const response = await task.find({
            project: req.params.id
        });


        if (response.length === 0) {
            return res.status(404).json({
                msg: "No tasks are found"
            });
        }
        console.log(response)

        return res.json(response);

    } catch (err) {
        console.error("Error fetching tasks", err);
        return res.status(500).json({ msg: "An error occurred while fetching tasks" });
    }
});


taskRouter.get('/singletask/:id', auth, async (req, res) => {
    try {
        console.log(req.params.id)
        const response = await task.findOne({
            _id: req.params.id
        });

        console.log(response)

        return res.json(response);

    } catch (err) {
        console.error("Error fetching single tasks", err);
        return res.status(500).json({ msg: "An error occurred while single tasks" });
    }
});



// taskRouter.put('/updateone', auth, async (req, res) => {
//     try {
     
//         const { success,error } = taskUpdateBody.safeParse(req.body);
//         if (!success) {
//             console.log(error);  
//             return res.status(400).json({
//                 msg: "Body parsing failed in updating task",
//                 details: error.errors 
//             });
//         }

//         const { id } = req.body; 
        
          
//           const response = await task.findByIdAndUpdate(
//             id,
//             {
//               $push: { remarks: req.body.remarks },
//             },
//             { new: true } 
//           );

//            if (!response) {
//             return res.status(404).json({
//                 msg: "Task not found",
//             });
//         }

//         return res.json({
//             msg: "Task updated successfully",
//             response,
//         });

//     } catch (err) {
//         console.error("Error while updating task", err);
//         return res.status(500).json({ msg: "An error occurred while updating the task" });
//     }
// });




taskRouter.delete('/deletetask/:id',auth,async(req,res)=>{

    try{
        const projectId= req.params.id;
       
        const response = await task.deleteOne({
            _id:projectId
        })

        console.log(response)

        res.status(200).json({
            msg:"deleted successfully"
        });

    }
    catch(err){
        console.log("err while deleting task", err);
        return res.json(err)
    }

})

taskRouter.get('/userspecifictasks',auth,async(req,res)=>{

    try{
        const id=req.id

        const response= await task.find({
            assignedTo:id
        })


        if(!response){
            return res.json({
                msg:"issue in db call of fetching user specific task"
            })
        }
        
        return res.json(response)



    }
    catch(err){
        console.log("err while fetching user specific task", err);
        return res.json(err);
    }

})



taskRouter.post('/updateuserspecifictask', auth, async (req, res) => {
    try {
        
        if (!req.body.remarks && !req.body.status) {
            return res.json({
                msg: "body is missing"
            });
        }
        console.log(req.body)
        
        
        const { success } = updateuserspecificTaskBody.safeParse(req.body);
        if (!success) {
            return res.json({
                msg: "body is erroneous"
            });
        }

        const obj={

        }
        
        
        
if (req.body.title) {
    obj.title = req.body.title; 
}

if (req.body.description) {
    obj.description = req.body.description;
}

if(req.body.remarks){
    obj. $push={ remarks: req.body.remarks }
}
if(req.body.status){
    obj.status=req.body.status
}
        
        const {id}=req.body;
        console.log("id",id)

        

        const response = await task.findByIdAndUpdate(
            id,
            obj,
            { new: true } 
          );

       
        if (!response) {
            return res.json({
                msg: "issue in db call of fetching user specific task"
            });
        }

     
        return res.json(response);
        
    } catch (err) {
        console.log("err while fetching user specific task", err);
        return res.status(500).json({ msg: "Internal Server Error", error: err.message });
    }
});


taskRouter.post('/changestatus',auth,async(req,res)=>{

    try{
        const id=req.id
        if(req.body.status==="Select a status"){
            const response= await task.find({
                assignedTo:id   
            })

            return res.json(response)
        }

        const response= await task.find({
            assignedTo:id,
            status:req.body.status

        })


        if(!response){
            return res.json({
                msg:"issue in db call of fetching user specific task"
            })
        }
        
        return res.json(response)



    }
    catch(err){
        console.log("err while fetching user specific task", err);
        return res.json(err);
    }

})



module.exports = taskRouter;

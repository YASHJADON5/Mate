

const express= require('express');

const mainRouter= express.Router();
const userRouter= require('./userRoutes')
const projectRouter= require('./projectRoutes')
const taskRouter= require('./taskRoutes')



mainRouter.use('/user', userRouter)
mainRouter.use('/task', taskRouter)
mainRouter.use('/project',projectRouter)



module.exports= mainRouter
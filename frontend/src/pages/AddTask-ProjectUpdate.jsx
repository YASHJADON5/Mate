import React, { useState,useEffect } from 'react'
import plusicon from '../assets/plusIcon.svg'
import { useNavigate,useLocation, useLoaderData } from 'react-router-dom'
import backIconBlue from '../assets/backIconBlue.svg'
import spinner from '../assets/spinner.svg'

function AddTaskProjectUpdate() {
  const navigate= useNavigate()
  const projectId = localStorage.getItem('PrID');
  const [loading,setLoading]= useState(false)

  
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/') 
    }
  }, [navigate])



  const AddTaskClick=()=>{

    navigate('/addtask')
    
  }
  const EditProjectClick=()=>{
    navigate('/editproject' );
  }
  const handleBack=()=>{
    localStorage.removeItem('PrID')
    localStorage.removeItem('taskId')
    navigate('/projects')
  }
  const ViewTaskClick=()=>{
    navigate('/tasks')
  }
  if(loading){
    return (
        <div className='flex items-center justify-center h-screen'>
        <img className='h-20 w-20' src={spinner} alt="" />
        </div>
    )
  }
  

  return (
    <div> 
           <div onClick={handleBack}>
        <img className='h-14 w-14 ml-5 pt-4 hover:scale-125 transition ease-linear duration-300  cursor-pointer' src={backIconBlue} alt="" />
        </div>

          <div className='mr-5 ml-40 mt-6'>
          
          </div>
          <div className='h-screen flex justify-center '>
              <div className='bg-[#8AAAE5] h-5/6  w-5/6 rounded-2xl'>



                    <div className='md:flex md:justify-center md:items-center h-full mt-24 md:mt-0 '>
                      <div onClick={AddTaskClick} className='text-center text-white text-3xl border-2 b-white px-10 py-4 hover:scale-105 transition ease-linear duration-300 cursor-pointer font-semibold w-56 mx-auto my-5 '>Create Task</div>
                      <div onClick={ViewTaskClick} className='text-center text-white text-3xl border-2 b-white px-10 py-4 hover:scale-105 transition ease-linear duration-300 cursor-pointer font-semibold w-56 mx-auto my-5'>View Tasks</div>
                      <div onClick={EditProjectClick} className='text-center text-white text-3xl border-2 b-white px-10 py-4 hover:scale-105 transition ease-linear duration-300 cursor-pointer font-semibold w-56 mx-auto  my-5'>Edit Project</div>

                    </div>

              
              </div>           
     
          </div>
      
      
    </div>
   
  )
}

export default AddTaskProjectUpdate

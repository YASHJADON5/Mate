import React, { useEffect, useState } from 'react'
import TaskCard from '../components/TaskCard'
import backgroundImage from '../assets/Matebackground.jpeg';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import spinner from '../assets/spinner.svg'
import backIcon from '../assets/backIcon.svg'
import trashIcon from '../assets/trashIcon.svg'


const base_url = import.meta.env.VITE_BASE_URL;

function Tasks() {
  const navigate= useNavigate()
 
  const [loading,setLoading]= useState(false)
  
  const [tasks,setTasks]= useState([]);
  const id= localStorage.getItem('PrID')
 

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/') 
    }
  }, [navigate])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${base_url}/api/v1/task/projectspecifictask/${id}`, {
          headers: {
            "authorization": `Bearer ${token}`
          }
        });
        
        setTasks(response.data); 
      } catch (err) {
        console.log(err); 
      } finally {
        setLoading(false); 
      }
    };
  
    fetchData(); 
  }, []);
  
 console.log(tasks)

 const handleBack=()=>{
  localStorage.removeItem('PrId')
  navigate('/addtaskprojectupdate')
 }

 if(loading){
  return (
      <div className='flex items-center justify-center h-screen'>
      <img className='h-20 w-20' src={spinner} alt="" />
      </div>
  )
}


  return (
      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="bg-cover bg-center h-screen overflow-auto"
      >
        <div onClick={handleBack}>
        <img className='h-14 w-14 ml-5 pt-4 hover:scale-125 transition ease-linear duration-300  cursor-pointer' src={backIcon} alt="" />
      </div>



       {tasks.map(task => (
       <TaskCard title={task.title} key={task._id} id={task._id} description={task.description} status={task.status} date={task.startDate} />
       ))}

       {tasks.length===0&&<div className='h-full w-full flex justify-center items-center text-gray-600 text-4xl font-bold'>You have not created any task yet</div>}

      
    </div>
  )
}

export default Tasks

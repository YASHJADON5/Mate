import React, { useEffect, useState } from 'react'
import backgroundImage from '../assets/Matebackground.jpeg';
import backIcon from '../assets/backIcon.svg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import TaskCard from '../components/TaskCard';
import spinner from '../assets/spinner.svg'

const base_url = import.meta.env.VITE_BASE_URL;

function TasksForUsers() {
    const navigate= useNavigate()
    const [loading,setLoading] =useState(false)
    const [tasks,setTasks]= useState([])
    const [toggle,setToggle] =useState(false);
    const[statusValue,setStatusValue]=useState("Select a status")
    localStorage.setItem('page',"userSpecifictasks")

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/') 
        }
      }, [navigate])
    

    useEffect(()=>{
        const fetchTasks = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${base_url}/api/v1/task/userspecifictasks`, {
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                });
                console.log(response.data);
                setTasks(response.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    },[])

    const handleStatusValueChange=(e)=>{
        setStatusValue(e.target.value)
    }

    useEffect(()=>{
        
        
        const changeStatus = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem('token');
                const response = await axios.post(`${base_url}/api/v1/task/changestatus`, {
                    status: statusValue
                }, {
                    headers: {
                        "authorization": `Bearer ${token}`
                    }
                });
                setTasks(response.data);
                setToggle(true);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        changeStatus();
    },[statusValue])


    const handleBack=()=>{
        localStorage.removeItem('page')
        navigate('/dashboard')
    }
    if(loading){
        return (
            <div  className='z-1  flex items-center justify-center h-screen'>
            <img className='z-2 h-20 w-20' src={spinner} alt="loading" />
            
            </div>
        )
      }
      console.log(tasks)
      console.log(statusValue)
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-cover bg-center h-screen overflow-auto"
    >   
    <div className='flex justify-between mr-8 py-4 md:mr-16  mt-4'>
        <div  onClick={handleBack}>
        <img className='h-14 w-14 ml-5 pt-4 hover:scale-125 transition ease-linear duration-300  cursor-pointer' src={backIcon} alt="" />
      </div>

      <div>
      <select
            
            onChange={handleStatusValueChange}
            value={statusValue}
            className='mt-2 block  md:p-4 p-3 bg-[#8AAAE5] border border-blue-400 text-white rounded-lg outline-none focus:ring focus:ring-blue-400'
          > <option value="Select a status">Select a status</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
      </div>

      </div>


      {tasks.map((task)=>{
        return(
       <TaskCard title={task.title} key={task._id} id={task._id} description={task.description} status={task.status} date={task.startDate} />
      )
      })}

      {tasks.length===0&&toggle&&statusValue==="Select a status"&&<div className='h-full w-full flex justify-center items-center text-gray-600 text-4xl font-bold'>There are no assigned tasks to you</div>}


      {tasks.length===0&&toggle&&statusValue==="Not Started"&&<div className='h-full w-full flex justify-center items-center text-gray-600 text-4xl font-bold'>There are no assigned tasks that you have started</div>}

      {tasks.length===0&&toggle&&statusValue==="In Progress"&&<div className='h-full w-full flex justify-center items-center text-gray-600 text-4xl font-bold'>There are no assigned tasks to you that are in progress</div>}

      {tasks.length===0&&statusValue==="Done"&&<div className='h-full w-full flex justify-center items-center text-gray-600 text-4xl font-bold'>There are no assigned tasks that you have completed</div>}
      

      

      
    </div>
  )
}

export default TasksForUsers

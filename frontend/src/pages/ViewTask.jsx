import React, { useEffect, useState } from 'react';
import backgroundImage from '../assets/Matebackground.jpeg';
import spinner from '../assets/spinner.svg';
import backIcon from '../assets/backIcon.svg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import trashIcon from '../assets/trashIcon.svg'
import './styles.css'

const base_url = import.meta.env.VITE_BASE_URL;

function ViewTask() {
  const navigate = useNavigate();
  const token= localStorage.getItem('token')
  const id = localStorage.getItem('taskId');
  const page=localStorage.getItem('page')||"none"
  const [loading, setLoading] = useState(false);
  const [newRemarks,setNewRemarks]= useState("")
  const [initialStatus,setInitialStatus]= useState("")
  const [task, setTask] = useState({
    title: '',
    description: '',
    remarks: '',
    status: 'Not Started',
  });

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/') 
    }
  }, [navigate])


  const[tasks,setTasks] =useState()

  const handleTitle = (e) => {
    setTask({ ...task, title: e.target.value });
  };

  const handleDescription = (e) => {
    setTask({ ...task, description: e.target.value });
  };

  const handleRemarks = (e) => {
    const value = e.target.value;
    setTask((prevTask) => ({
      ...prevTask,                    
      remarks:value, 
    }));

  };
  const handleStatusChange = (e) => {
    setTask({ ...task, status: e.target.value });
  };

  const handleUpdateTask = async() => {
     
    try{
      const token= localStorage.getItem('token')
      setLoading(true)

      const response= await axios.put(`${base_url}/api/v1/task/updateone`,{
        id:localStorage.getItem('taskId'),
        title: task.title,
        description: task.description,
        status: task.status,
        remarks: task.remarks

      },{
        headers:{
          "authorization":`Bearer ${token}`
        }
      })
      localStorage.removeItem('PrId')
      navigate('/dashboard')

    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
       
  };

  const handleNewRemarks= (e)=>{
    setNewRemarks(e.target.value)
  }

  const handleBack = () => {
    localStorage.removeItem('page')
    page !== "userSpecifictasks" ? navigate('/addtaskprojectupdate') : navigate('/taskforuser');
};

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('taskId');

        const response = await axios.get(`${base_url}/api/v1/task/singletask/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data)
        setInitialStatus(response.data.status);
        setTasks(response.data);
        setTask(response.data)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleDelete=async()=>{

    try{
      const token= localStorage.getItem('token')
        
      const response= await axios.delete(`${base_url}/api/v1/task/deletetask/${id}`,{
        headers:{
          "authorization":`Bearer ${token}`
        }
      })
      console.log(response.data)
      localStorage.removeItem('taskId')
      if(response.data.msg==="deleted successfully"){
        navigate('/projects')
      }


     }
     catch(err){
      console.log("error while deleting task", err)
     }

    
  }
  console.log(initialStatus, task.status)
  const handleUpdateTaskForUserSpecificTask=()=>{
       
    if(newRemarks===""){
      alert('Add remark to update status')
      return;
    }
    const updateTask=async()=>{
      setLoading(true)
      console.log("newRemarks:", newRemarks);

      try{
        const token= localStorage.getItem('token')

        const response= await axios.post(`${base_url}/api/v1/task/updateuserspecifictask`,{
          id:id,
          title:task.title,
          description:task.description,
          status:task.status,
          remarks:newRemarks
        },{
          headers:{
            "authorization":`Bearer ${token}`
          }
        })

        if(page==="userSpecifictasks"){
          navigate('/taskforuser')
        }
        else{
          navigate('/addtaskprojectupdate')
        }

      }
      catch(err){

      }
      finally{
        setLoading(false)
      }

    }

    updateTask()

  }
  console.log(task)

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <img className='h-20 w-20' src={spinner} alt="" />
      </div>
    );
  }

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-cover bg-center h-screen overflow-auto"
    >
     <div className='flex justify-between mr-5 pt-4 '>
            <div onClick={handleBack}>
              <img className='h-14 w-14 ml-5 pt-4 hover:scale-125 transition ease-linear duration-300  cursor-pointer' src={backIcon} alt="" />
            </div>
            {page!=="userSpecifictasks"&&<div onClick={handleDelete}>
                <img className='h-14 w-14 hover:scale-125 transition ease-linear duration-300  cursor-pointer' src={trashIcon} alt="trashIcon" />
            </div>}
       </div>

      <div className='flex w-screen h-screen justify-center'>
        <div className='mt-4 border-2 b-white md:p-8 md:px-16 h-screen w-full px-8 md:w-1/2 overflow-auto hide-scrollbar'>
          <label className='text-gray-600 text-2xl font-semibold'>Title</label>
          <textarea
            readOnly={page === "userSpecifictasks"}
            onChange={handleTitle}
            className='block w-full mt-2 min-h-20 p-4 font-normal text-xl outline-blue-400'
            value={task.title}
            name="Title"
          ></textarea>

          <label className='text-gray-600 text-2xl font-semibold mt-8'>Description</label>
          <textarea
            readOnly={page === "userSpecifictasks"}
            onChange={handleDescription}
            className='block mt-2 w-full min-h-20 p-4 font-normal text-xl outline-blue-400'
            value={task.description}
            name="Description"
          ></textarea>

          

          <label className='text-gray-600 text-2xl font-semibold mt-8'>Status</label>
          <select
            
            onChange={handleStatusChange}
            value={task.status}
            className='mt-2 block w-full p-4 bg-[#8AAAE5] border border-blue-400 text-white rounded-lg outline-none focus:ring focus:ring-blue-400'
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <label className='text-gray-600 text-2xl font-semibold mt-10'>{page==="userSpecifictasks"?<span>Old Remark</span>:<span>Edit remarks</span>}</label>
          {page!=="userSpecifictasks"&&<textarea
            
            value={task.remarks}
            onChange={handleRemarks}
            className='block mt-2 w-full min-h-30 p-4 font-normal text-xl outline-blue-400'
            name="remarks"
          ></textarea>}

    {page!=="userSpecifictasks" &&<label className='text-gray-600 text-2xl font-semibold mt-10' >Old Remarks</label> }
  <div>

    {tasks&&tasks.remarks.map((remark, index) => (
      <div  key={index} className='w-1/2 text-lg font-semibold'>
        • {remark}
      </div>
    ))}
  </div> 
 


            
  
    <label className='text-gray-600 text-2xl font-semibold mt-10'>New Remarks</label>
    <textarea
    placeholder='Add new remarks'
      onChange={handleNewRemarks}
      value={newRemarks}
      className='block mt-2 w-full min-h-20 p-4 font-normal text-xl outline-blue-400'
      name="remarks"
    ></textarea>
  



      
          {<div onClick={handleUpdateTaskForUserSpecificTask} className='mt-3 py-2 mx-auto text-xl font-semibold bg-[#8AAAE5] rounded-2xl px-2 text-white cursor-pointer text-center'>Update</div>}
        </div>
      </div>
    </div>
  );
}

export default ViewTask;

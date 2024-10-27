
import React,{useState,useEffect} from 'react'
import backgroundImage from '../assets/Matebackground.jpeg';
import Options from '../components/Options'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import spinner from '../assets/spinner.svg'
import backIcon from '../assets/backIcon.svg'

const base_url = import.meta.env.VITE_BASE_URL;

function AddTask() {
  const navigate= useNavigate()
  const location = useLocation()
  const [loading,setLoading] = useState(false)
  const [description,setDescription] = useState("");
  const [title,setTitle] = useState("");
  const [remarks,setRemarks] = useState("");
  // const [startDate,setStartDate] =useState("")
  const [assignedUser,setAssignedUser]= useState("")
  const [status,setStatus]= useState("")

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/') 
    }
  }, [navigate])


  const id = localStorage.getItem('PrID')

  console.log(id)


  const handleTitle=(e)=>{
    setTitle(e.target.value)
    console.log(title);
}
const handleDescription=(e)=>{
    setDescription(e.target.value)
    console.log(description);
}
const handleRemarks=(e)=>{
  setRemarks(e.target.value)
  console.log(remarks);
}
const handleDate=(e)=>{
  setStartDate(e.target.value)
  console.log(startDate);
}
const handleStatusChange=(e)=>{
  setStatus(e.target.value)
  console.log(status);
}

const handleAssignedUserChange=(e)=>{
  setAssignedUser(e.target.value)
  console.log(assignedUser);
}

const handleCreateTask=async()=>{
  if(!title||!description){
    
    alert('plz fill title and description')
    return 
  }

  try{
    setLoading(true);
    const token= localStorage.getItem('token')

    const response = await axios.post(`${base_url}/api/v1/task/create`,{
        
      title: title,
      description:description,
      status: status,
      remarks: [remarks],
      projectId: id,
      assignedToId:assignedUser



    },{
      headers:{
        "authorization":`Bearer ${token}`
      }
    })

    navigate('/dashboard')

  }
  catch(err){
    console.log("error while creating a task",err)
  }
  finally{
    setLoading(false)
  }



}

const handleBack=()=>{
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

        <div className='flex w-screen h-screen  justify-center '>
            
            <div className='mt-4   border-2 b-white p-8 px-16'>  
              <label  className='text-white text-2xl font-semibold'>Title</label>        
                      <textarea placeholder='Title' onChange={handleTitle} className=' block w-96 mt-2  min-h-20 p-4 font-normal text-xl outline-blue-400 ' name="Title" id="" ></textarea>
              <label  className='text-white text-2xl font-semibold mt-8'>Description</label>        
  
                      <textarea placeholder='Description' onChange={handleDescription} className='block mt-2 w-96 min-h-20  p-4 font-normal text-xl outline-blue-400'  name="Description" id=""></textarea>

              <label  className='text-white text-2xl font-semibold mt-8' >Start Date</label> 

              {/* <input placeholder='01-01-2024' onChange={handleDate} type="text" className='w-96 block h-10 p-4'/>      */}
              <label className='text-white text-2xl font-semibold mt-8'>Status</label>
              <select onChange={handleStatusChange} className='mt-2 block w-96 p-4 bg-[#8AAAE5] border border-blue-400 text-white rounded-lg outline-none focus:ring focus:ring-blue-400'>
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
              </select>

              <label className='text-white text-2xl font-semibold mt-8'>Assign To</label>
                 
                 <Options handleAssignedUserChange={handleAssignedUserChange}/>

              <label className='text-white text-2xl font-semibold mt-10'>Remarks</label>        
  
              <textarea placeholder='Add remarks' onChange={handleRemarks} className='block mt-2 w-96 min-h-20  p-4 font-normal text-xl outline-blue-400'  name="remarks" id=""></textarea>

                      
            <div onClick={handleCreateTask} className='mt-3 py-2 mx-auto text-xl font-semibold bg-[#8AAAE5] rounded-2xl px-2 text-white cursor-pointer text-center'>Create Task</div>
  
            </div>
  
  
         </div>

      
    </div>
  )
}

export default AddTask

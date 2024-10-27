import React, { useEffect, useState } from 'react'
import backgroundImage from '../assets/Matebackground.jpeg';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import spinner from '../assets/spinner.svg'
import backIcon from '../assets/backIcon.svg'
import trashIcon from '../assets/trashIcon.svg'

const base_url = import.meta.env.VITE_BASE_URL;

function EditableProject() {
  const location = useLocation()
  const navigate= useNavigate()
  const [loading,setLoading] = useState(false);
  const [project,setProject]= useState({});
  const id = localStorage.getItem('PrID');
  console.log(id)

  const [description,setDescription] = useState("");
  const [title,setTitle] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/') 
    }
  }, [navigate])




  const handleTitle=(e)=>{
    setTitle(e.target.value)
    console.log(title);
}
const handleDescription=(e)=>{
    setDescription(e.target.value)
    console.log(description);
}

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token')
          if (!token) {
            navigate('/') 
          }
        
        const response = await axios.get(`${base_url}/api/v1/project/singleproject/${id}`, {
          headers: {
            "authorization": `Bearer ${token}`,
          },
        });
        console.log(response.data)
        setTitle(response.data.title)
        setDescription(response.data.description)

        setProject(response.data);
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false); 
      }
    })();
  }, []);

  const handleUpdate= async()=>{
      if(!title||!description){
        alert('Title/Description must contain some values')
        return
      }
       
       try{
        const token= localStorage.getItem('token')
          
        const response= await axios.put(`${base_url}/api/v1/project/updateproject/${id}`,{
          
          title:title,
          description:description

        },{
          headers:{
            "authorization":`Bearer ${token}`
          }
        })

        if(response.data.acknowledged===true){
          localStorage.removeItem('PrID')
          navigate('/projects')
        }


       }
       catch(err){
        console.log("error while updating project", err)
       }
  }


  if(loading){
    return (
        <div className='flex items-center justify-center h-screen'>
        <img className='h-20 w-20' src={spinner} alt="" />
        </div>
    )
  }


  const handleBack=()=>{
    
    navigate('/addtaskprojectupdate')
  }


  const handleDelete=async()=>{
    
    try{
      const token= localStorage.getItem('token')
        
      const response= await axios.delete(`${base_url}/api/v1/project/deleteproject/${id}`,{
        headers:{
          "authorization":`Bearer ${token}`
        }
      })

      if(response.data.msg==="deleted successfully"){
        navigate('/projects')
      }


     }
     catch(err){
      console.log("error while deleting project", err)
     }

    
  }


  

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-cover bg-center h-screen overflow-auto "
    >
      <div className='flex justify-between mr-5 pt-4 '>
            <div onClick={handleBack}>
              <img className='h-14 w-14 ml-5 pt-4 hover:scale-125 transition ease-linear duration-300  cursor-pointer' src={backIcon} alt="" />
            </div>
            <div onClick={handleDelete}>
                <img className='h-14 w-14 hover:scale-125 transition ease-linear duration-300  cursor-pointer' src={trashIcon} alt="trashIcon" />
            </div>
       </div>
 


<div className='flex w-screen h-screen  justify-center'>
            
            <div className='mt-36'>  
              <label  className='text-white text-2xl font-semibold'>Title</label>        
                      <textarea value={title} onChange={handleTitle} className=' block w-96 mt-2  min-h-20 p-4 font-normal text-xl outline-blue-400 ' name="Title" id="" >sss</textarea>
              <label  className='text-white text-2xl font-semibold mt-8'>Description</label>        
  
                      <textarea onChange={handleDescription} value={description} className='block mt-2 w-96 min-h-60  p-4 font-normal text-xl outline-blue-400'  name="Description" id=""></textarea>
                      
            <div onClick={handleUpdate}  className='mt-3 py-2 mx-auto text-xl font-semibold bg-[#8AAAE5] rounded-2xl px-2 text-white cursor-pointer text-center'>Update</div>
  
            </div>
  
  
         </div>
  
        

     
    </div>
  )
}

export default EditableProject

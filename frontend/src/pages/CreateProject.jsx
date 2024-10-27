import React, { useState,useEffect } from 'react'
import backgroundImage from '../assets/Matebackground.jpeg';
import axios from 'axios'
import spinner from '../../src/assets/spinner.svg'
import { useNavigate } from 'react-router-dom';
import backIcon from '../assets/backIcon.svg'

const base_url = import.meta.env.VITE_BASE_URL;

function CreateProject() {
    const navigate= useNavigate()
    const [loading,setLoading] = useState(false)
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

    const handleCreateProject=async()=>{
        setLoading(true);
        const token= localStorage.getItem('token')
       try{
        const response = await axios.post(`${base_url}/api/v1/project/createproject`,
            {
                title:title,
                description:description


            },{

            
            headers:{
            "Authorization" :`Bearer ${token}` 
            }
        }
        )

        navigate('/dashboard')
    }
    catch(err){
        console.log(err)
    }
    finally{
        setLoading(false);
    }


    }
    const handleBack=()=>{
    
        navigate('/dashboard')
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
      className="bg-cover bg-center h-screen "
    >
        <div onClick={handleBack}>
              <img className='h-14 w-14 ml-5 pt-4 hover:scale-125 transition ease-linear duration-300  cursor-pointer' src={backIcon} alt="" />
        </div>
       
       <div className='flex w-screen h-screen  justify-center'>
            
          <div className='md:mt-36 mt-16'>  
            <label  className='text-white text-2xl font-semibold'>Title</label>        
                    <textarea placeholder='Title' onChange={handleTitle} className='rounded-md block w-96 mt-2  min-h-20 p-4 font-normal text-xl outline-blue-400 ' name="Title" id="" ></textarea>
            <label  className='text-white text-2xl font-semibold mt-8'>Description</label>        

                    <textarea placeholder='Description' onChange={handleDescription} className='rounded-md block mt-2 w-96 min-h-60  p-4 font-normal text-xl outline-blue-400'  name="Description" id=""></textarea>
                    
          <div onClick={handleCreateProject} className='mt-3 py-2 mx-auto text-xl font-semibold bg-[#8AAAE5] rounded-2xl px-2 text-white cursor-pointer text-center'>Add Project</div>

          </div>


       </div>

      
    </div>
  )
}

export default CreateProject

import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Options({handleAssignedUserChange}) {

    const base_url = import.meta.env.VITE_BASE_URL;
    const [user,setUser]= useState([])
    console.log(user)

    useEffect(()=>{
        (async()=>{
            try{

                const token= localStorage.getItem('token')
    
                const respose= await axios.get(`${base_url}/api/v1/user/bulk`,{
                    headers:{
                        "authorization":`Bearer ${token}`
                    }
                })
                setUser(respose.data)
            }
            catch(err){
                console.log("error while fetching users", err);
            }

        })()
    },[])


  return (
    <div>

        
            <select onChange={handleAssignedUserChange} className='mt-2 block w-96 p-4 bg-[#8AAAE5] border border-blue-400 text-white rounded-lg outline-none focus:ring focus:ring-blue-400'>
            <option value="">Select a user</option>
                {user.map((user) => (
                    <option key={user._id} value={user._id}>{user.fullname}</option>
                ))}
            </select>

       
      
    </div>
  )
}

export default Options

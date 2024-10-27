import React from 'react'
import { useNavigate } from 'react-router-dom'


function ProjectCard({title,description, date,id}) {
    const navigate= useNavigate();
    const handleProjectCard=()=>{
        localStorage.setItem('PrID',id)
        navigate('/addtaskprojectupdate', { state: { projectId: id } });
    }
  return (
    <div onClick={handleProjectCard} className='bg-white mx-8 md:w-1/2 md:mx-auto cursor-pointer border border-b-2'>
        <div className='text-4xl font-bold py-3 px-4 text-gray-700'>{title}</div>
        <div className='px-4 text-2xl font-bold text-gray-500'>{`${description.slice(0,150)}...`}</div>
        <div className='flex justify-between mt-2'>
        
            
            <div className='ml-4 py-2 text-xl font-semibold text-gray-500'>
                {date.toString().substring(0,15)}
            </div>
        </div>
      
    </div>
  )
}

export default ProjectCard

import React,{useEffect} from 'react'
import plusicon from '../assets/plusIcon.svg'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()
  
  localStorage.removeItem('PrID')
  localStorage.removeItem('taskId')
  localStorage.removeItem('page')
  const token=localStorage.getItem('token')


  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/') 
    }
  }, [navigate]) 
  const hanldeCreateProjectClick=()=>{
       navigate('/createproject')
  }
  const handleProjectsClick=()=>{
    navigate('/projects')
  }
  const handleTasksClick=()=>{
    navigate('/taskforuser')
  }
  const handleSignout=()=>{
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div> 
           <div className='flex justify-between py-4'>
          <div className='mr-5 ml-10 md:ml-40 mt-3'>
          <h1 className='cursor-pointer text-4xl font-semibold text-[#8AAAE5]  hover:scale-105 transition ease-linear duration-300'>Mate</h1>
          </div>
          <button onClick={handleSignout} className='mt-3 py-2 mr-10 md:mr-36 text-xl font-semibold bg-[#8AAAE5] rounded-2xl px-2 text-white  hover:scale-105 transition ease-linear duration-300'>Signout</button>
          </div>
          <div className='h-screen flex justify-center '>
              <div className='bg-[#8AAAE5] h-5/6  w-5/6 rounded-2xl'>

                    <div className='relative ' onClick={hanldeCreateProjectClick}>
                      <div className='absolute right-3  md:right-6 flex items-center mt-4 mr-4 cursor-pointer hover:scale-105 transition ease-linear duration-300 border-2 b-white p-1 px-2 rounded-xl'>
                      <img className=' h-10 w-10 ' src={plusicon}
                      alt="icon image" />
                      <span className='text-white text-lg font-medium'>Project</span>
                      </div>               
                    </div>


                    <div className='flex justify-center items-center gap-2 h-full'>
                      <div onClick={handleProjectsClick} className='text-center  text-white text-3xl md:mr-8 border-2 b-white w-36 md:w-48 md:px-10 py-4 hover:scale-105 transition ease-linear duration-300 cursor-pointer font-semibold '>Projects</div>
                      <div onClick={handleTasksClick} className='text-center text-white text-3xl md:ml-8 border-2 b-white w-36 md:px-10 py-4 md:w-48 hover:scale-105 transition ease-linear duration-300 cursor-pointer font-semibold'>Tasks</div>

                    </div>

              
              </div>           
     
          </div>
      
      
    </div>
   
  )
}

export default Dashboard

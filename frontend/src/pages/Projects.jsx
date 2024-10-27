import React, { useEffect,useState } from 'react'
import backgroundImage from '../assets/Matebackground.jpeg';
import ProjectCard from '../components/ProjectCard';
import axios from 'axios'
import backIcon from '../assets/backIcon.svg'
import spinner from '../assets/spinner.svg'
import { useNavigate } from 'react-router-dom';

const base_url = import.meta.env.VITE_BASE_URL;
function Projects() {
  const navigate= useNavigate()
  const [loading,setLoading] = useState(false);
  const [projects,setProjects] = useState([])
  const [taskCount,setTaskCount]= useState(0);
  localStorage.removeItem('page')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/') 
    }
  }, [navigate])

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${base_url}/api/v1/project/bulkprojects`, {
          headers: {
            "authorization": `Bearer ${token}`,
          },
        });
        setProjects(response.data);
        

        console.log(response.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false); 
      }
    })();
  }, []);
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
  

  console.log(projects)

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="bg-cover bg-center h-screen overflow-auto"
    >
      <div onClick={handleBack}>
        <img className='h-14 w-14 ml-5 pt-4 hover:scale-125 transition ease-linear duration-300  cursor-pointer' src={backIcon} alt="" />
      </div>

      


       <div className='md:mr-12 md:-16'>
          {projects.map((project) => (
            
              <ProjectCard key={project._id} title={project.title} description={project.description} date={project.createdAt}  taskCount={taskCount} id={project._id}/>

            
        ))}

{projects.length===0&&<div className='h-96 w-full flex justify-center items-center text-gray-600 text-4xl font-bold'>You have not initialized any project yet</div>}

       
        </div>
    </div>
  )
}

export default Projects

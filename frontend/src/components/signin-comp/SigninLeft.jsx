import  { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import InputBox from '../signin-signup-shared/InputBox'
import axios from 'axios';
import {z} from 'zod'


const signInBody= z.object({
  email:z.string().email(),
  password:z.string()
})



const base_url = import.meta.env.VITE_BASE_URL;


function SigninLeft({setLoading}) {
   const navigate= useNavigate();


  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/dashboard') 
    }
  }, [navigate])
   
  
  

    const [showError,setShowError]=useState({
      showEmailError:true,
      showPasswordError:true
    });

   
    
   
    const [signInInputs,setsignInInputs]= useState({
      email:'',
      password:''
    })
    const [errors,setErrors] =useState({
         emailError:'',
         passwordError:''       
    })









    const handleForm=async()=>{

      setErrors((prev)=>{
        return {
          ...prev,
          emailError:'',
         passwordError:'' 
        }
      })
      setShowError((prev)=>{
            return {
               ...prev,
               showEmailError:true,
               showPasswordError:true
            }
      });

         setLoading(true);
       

      if(!signInInputs.email){
       
               setErrors((preverror)=>{
                return {
                ...preverror,
                emailError:"Email is missing"
              }
               })
      }
      if(!signInInputs.password){

        setErrors((preverror)=>{
          return {
          ...preverror,
          passwordError:"password is missing"
        }
         })             
        
      }

      if(signInInputs.email===''||signInInputs.password===''){
        setLoading(false);
        
        return 
      }
   
      
      const result= signInBody.safeParse(signInInputs);
      
      if(!result.success){
        
        
        const issues=result.error.issues;

        const updatedErrors={
          emailError:'',
          passwordError:''   
        }
        

          issues.forEach((issue)=>{
          if(issue.path[0]==='email'){
            updatedErrors.emailError=issue.message
            
          }
          if(issue.path[0]==='password'){
            updatedErrors.passwordError=issue.message
          }
        })
        
          setErrors(updatedErrors)
          setLoading(false)
          return 
      }

      try{
      
        const response=await axios.post(`${base_url}/api/v1/user/signin`, {
                  email:signInInputs.email,
                  password:signInInputs.password         
        })
        
        localStorage.setItem('token',response.data.token);
        setLoading(false)
        navigate('/dashboard');
  
      }
      catch(e){
          
          if (e.response) {
            
            
            if ( e.response.data.msg === "user does not exist") {
                setErrors({ emailError: "Email not found", passwordError: "" });
            } else if ( e.response.data.message === "password is wrong") {
                setErrors({ emailError: "", passwordError: "Password is incorrect" });
            }
        }
        
      }   
      finally{
        setLoading(false);
        

      }
      

    }




  return (
    <div className='bg-[#8AAAE5] h-screen '>
           <div className='flex justify-center items-center h-screen '>
                  
                  <div className=' h-96 w-96'>

                        <div className='text-center  text-white font-bold text-4xl'>Sign In
                        </div>

                        <div className='pt-2 text-center md:text-lg font-medium text-gray-200'>Already have an account? <Link className='underline font-medium' to={'/signup'}>Signup</Link>
                        </div>
                        
                             <InputBox label={'Email'} placeholder={'example@gmail.com'} value={signInInputs.email} onChange={(e)=>{
                                 setsignInInputs({
                                  ...signInInputs,
                                  email:e.target.value
                                })
                                            if(e.target.value){
                                            setShowError((prev)=>{
                                                return {
                                                ...prev,
                                                showEmailError:false
                                                     }
                                                 });    
                                             }
                                             else{
                                            setShowError((prev)=>{
                                            return {
                                                ...prev,
                                                showEmailError:true
                                                }
                                             });    
                                            }
                                            
                        }} />
                        {errors.emailError &&showError.showEmailError&&<div className='text-white text-lg px-8'>{errors.emailError}</div>}
                         <InputBox label={'Password'} placeholder={'abc@@ABC124'} value={signInInputs.password} onChange={(e)=>{
                                 setsignInInputs({
                                  ...signInInputs,
                                  password:e.target.value
                                })
                                if(e.target.value){
                                  setShowError((prev)=>{
                                    return {
                                      ...prev,
                                      showPasswordError:false
                                    }
                           });      
                               }
                               else{
                                setShowError((prev)=>{
                                  return {
                                    ...prev,
                                    showPasswordError:true
                                  }
                         });    
                               }
                        }} />
                         {errors.passwordError &&showError.showPasswordError&&<div className='text-white text-lg px-8'>{errors.passwordError}</div>}
                       
                        <div className='px-8'>
                        <button onClick={handleForm} className='bg-[#1F1F1F] text-white  w-full mt-6 p-3 rounded-md hover:bg-black transition ease-in'>Login</button>
                        </div>


                  </div>

           </div>   
    </div>
  )
}
export default SigninLeft 
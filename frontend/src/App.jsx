import { BrowserRouter ,Route , Routes } from 'react-router-dom'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import './index.css'
import Dashboard from  './pages/Dashboard'
import CreateProject from './pages/CreateProject'
import Projects from './pages/Projects'
import EditableProject from './pages/EditableProject'
import AddTaskProjectUpdate from './pages/AddTask-ProjectUpdate'
import AddTask from './pages/AddTask'
import Tasks from './pages/Tasks'
import ViewTask from './pages/ViewTask'
import TasksForUsers from './pages/TasksForUsers'











function App() {
 return (
    
    
       <BrowserRouter>    
      <Routes>
                 
                 <Route path="/" element={<Signin/>} />
                 <Route path="/signup" element={<Signup/>} />
                 <Route path="/dashboard" element={<Dashboard/>} />
                 <Route path="/createproject" element={<CreateProject/>} />
                 <Route path="/projects" element={<Projects/>} />
                 <Route path="/addtaskprojectupdate" element={<AddTaskProjectUpdate/>} />
                 <Route path="/editproject" element={<EditableProject/>} />
                 <Route path="/addtask" element={<AddTask/>} />
                 <Route path="/tasks" element={<Tasks/>} />
                 <Route path="/viewtask" element={<ViewTask/>} />
                 <Route path="/taskforuser" element={<TasksForUsers/>} />
                 







      </Routes>
  </BrowserRouter>

  
 )


}

export default App

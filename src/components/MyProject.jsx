import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { deleteProjectAPI, userProjectAPI } from '../services/allAPI'
import { addProjectResponseContext, editProjectResponseContext } from '../contexts/ContextShare'
import EditProject from './EditProject'

function MyProject() {
    const {addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)
    const {editProjectResponse, setEditProjectResponse} = useContext(editProjectResponseContext)
    const [userProject, setUserProject] = useState([])
   
    const getUserProject = async()=>{
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            //no upload contents. only getting the contents. so give application/json as content type
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
          const result = await userProjectAPI(reqHeader)
          console.log(result.data);
          if (result.status === 200) {
            setUserProject(result.data)
    
          }
        
    }
    useEffect(()=>{
        getUserProject()
    },[addProjectResponse,editProjectResponse])

    //delete project
    const handleDelete = async(id)=>{
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            //no upload contents. only getting the contents. so give application/json as content type
            //we need token. because only logiined person can delte project. so need header. 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
          const result = await deleteProjectAPI(id, reqHeader)
          console.log(result);

          if(result.status===200){
            getUserProject()
          }
          else{
            console.log(result.response.data);
          }
    }

    return (
        <div className=' card shadow  p-4 '>
            <div className='d-flex justify-content-between'>
                <h4 className='text-info'>My projects</h4>
                <AddProject />
            </div>
            <div className='mt-4'>
                {userProject?.length>0?
                userProject?.map((item)=>(<div className='border d-flex align-items-center p-2 rounded'>
                <h5>{item.title}</h5>
                <div className='ms-auto d-flex'>
                    <EditProject project = {item}/>
                    <a href={item.github} target='_blank' className='btn'><i class="fa-brands fa-github text-success"></i></a>
                    <button onClick={()=>handleDelete(item._id)} className='btn'><i class="fa-solid fa-trash text-danger"></i></button>

                </div>
            </div>))

                    :
                <p className='text-danger fw-bolder fs-5 mt-4'>No Projects upload yet !!</p>}
            </div>
        </div>
    )
}

export default MyProject

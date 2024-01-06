import React, { useEffect } from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import {BASE_URL} from '../services/baseurl'
import { ToastContainer, toast } from 'react-toastify';
import { editProfileAPI } from '../services/allAPI';

function Profile() {


    //collaps
    const [open, setOpen] = useState(false);

    const [userProfile, setUserProfile] = useState({
        username:"",
        email:"",
        password:"",
        github:"",
        linkedin:"",
        profile:""
    })
    const [isUpdate, setIsUpdate] = useState(false)

    //to store existing image  that is from backend
    //once an image is uploaded then that image will be stored in existingImage
    const [existingImage, setExistingImage] = useState("")
    //to store url of new image (uploading from frontend)
    const [preview, setPreview] = useState("")

    useEffect(()=>{
        const user = JSON.parse(sessionStorage.getItem("existingUser")) //it is a string. so convert into object so give json.parse

        setUserProfile({...userProfile,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin,profile:""}) //initially profile empty, becoz only if any image is uploaded
        
        setExistingImage(user.profile)
    },[])

    useEffect(()=>{
        if(userProfile.profile){
            //to convert into url
            setPreview(URL.createObjectURL(userProfile.profile))
        }
        else{
            setPreview("")
        }

    },[userProfile.profile]) //userProfile.profile has any new content then load this function again

    const handleProfileUpdate = async()=>{
        const {username,email,password,github,linkedin,profile} = userProfile
        if(!github || !linkedin){
            toast.info('Please fill the form completely!..')
        }
        else{
            const reqBody = new FormData()
            reqBody.append("username",username)
            reqBody.append("email",email)
            reqBody.append("password",password)
            reqBody.append("github",github)
            reqBody.append("linkedin",linkedin)
            preview? reqBody.append("profile",profile):reqBody.append("profile",existingImage)

  
        const token = sessionStorage.getItem("token")

        if(preview){
            const reqHeader = {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`
            }
            const result = await editProfileAPI(reqBody,reqHeader)
            console.log(result);
            if(result.status===200){
                toast.success('profile updated successfully')
                sessionStorage.setItem("existingUser",JSON.stringify(result.data))
                setIsUpdate(true)
            }
            else{
                console.log(result.response.data);
            }

        }
    } 
    }

  return (
    <div className='card shadow p-5'>
        <div className='d-flex justify-content-between'>
            <h4>Profile</h4>
            <button onClick={() => setOpen(!open)} className='btn btn-outline-info  ms-5 rounded p-1'><i class="fa-solid fa-angle-down"></i></button>
        </div>
<Collapse in={open}>
        <div className='row justify-content-center mt-4'>
            <label htmlFor="profile" className='text-center'>
                <input  onChange={(e)=>setUserProfile({...userProfile,profile:e.target.files[0]})} type="file" id='profile' style={{display:'none'}}/>
                    {        
                        existingImage==""?       
                        <img width={'150px'} height={'150px'} src={preview?preview:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&usqp=CAU"} alt="no image" className='rounded-circle'/>
                        :<img width={'150px'} height={'150px'} src={preview?preview:`${BASE_URL}/uploads/${existingImage}`} alt="no image" className='rounded-circle'/>
                    }
            </label>
            <div>
            <input value={userProfile.github} onChange={(e)=>setUserProfile({...userProfile,github:e.target.value})} className='form-control mt-4 w-100' type="text" placeholder='GitHub' />

            </div>
            <div>
            <input value={userProfile.linkedin} onChange={(e)=>setUserProfile({...userProfile,linkedin:e.target.value})} className='form-control mt-4 w-100' type="text" placeholder='LinkedIn'/>

            </div>
            <div>
            <button onClick={handleProfileUpdate} className='btn btn-success mt-4 w-100'>Update</button>
            </div>
        </div>
        </Collapse>

        
        <ToastContainer position='top-center' theme='colored' autoClose={2000} />

    </div>
  )
}

export default Profile

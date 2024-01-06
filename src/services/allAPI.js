const { BASE_URL } = require("./baseurl")
const { commonAPI } = require("./commonAPI")



//register api
export const registerAPI = async(user)=>{ //user is the reqbody here
    return await commonAPI('POST',`${BASE_URL}/user/register`,user,"")
}

//logon api
export const loginAPI = async(user)=>{
    return await commonAPI('POST',`${BASE_URL}/user/login`,user,"")
}

//add project
export const addProjectAPI = async(reqBody, reqHeader)=>{
    return await commonAPI('POST',`${BASE_URL}/projects/add`,reqBody,reqHeader)
}



//get home project
export const homeProjectAPI = async()=>{
    return await commonAPI('GET',`${BASE_URL}/projects/home-project`)
}

//get all project
export const allProjectAPI = async(searchKey, reqHeader)=>{
    //query parameter // syntax:  path?key=value
    return await commonAPI('GET',`${BASE_URL}/projects/all-project?search=${searchKey}`,"",reqHeader)
}

//get user project
export const userProjectAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${BASE_URL}/projects/user-project`,"",reqHeader)
}

//edit project // only logined user can edit. so we need header
export const editProjectAPI = async(projectId,reqBody,reqHeader)=>{
    //passing projectId as path parameter
    return await commonAPI('PUT',`${BASE_URL}/projects/edit/${projectId}`,reqBody,reqHeader)
}

//delete project
export const deleteProjectAPI = async(projectId,reqHeader)=>{
    //passing projectId as path parameter
    //when delete reqBody should be given as empty onject
    return await commonAPI('DELETE',`${BASE_URL}/projects/remove/${projectId}`,{},reqHeader)
}
//edit profile
export const editProfileAPI = async(reqBody,reqHeader)=>{
    return await commonAPI('PUT',`${BASE_URL}/user/edit`,reqBody,reqHeader)
}


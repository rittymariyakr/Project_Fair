//import axios
import axios from "axios"

export const commonAPI = async(httprequest,url,reqBody,reqHeader)=>{
    const reqConfig = {
        //method,url,data,headers are predefined keys
        method:httprequest,
        url,
        data:reqBody,
        headers:reqHeader?reqHeader:{"Content-Type":"application/json"} //in our project there are 2 types of contents to upload. already available in internet and not avail in internet 
    }
    return await axios(reqConfig).then((result)=>{
        return result
    }).catch((err)=>{
        return err
    })
}


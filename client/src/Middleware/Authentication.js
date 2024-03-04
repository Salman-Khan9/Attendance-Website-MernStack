import axios from "axios"
import { set_logstatus } from "../Redux/Slices/AuthSlice"
import { useNavigate } from "react-router"
import {useDispatch } from "react-redux"
import { useEffect } from "react"

const Authentication = async(path) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        const logstatus = async()=>{

           
                const res = await axios.get("http://localhost:4000/logged",{withCredentials:true})
               dispatch( set_logstatus(res.data))
                if(res.data!==true){
            navigate(path)
                }
             
        }
        logstatus()
       
    }, [navigate,path,dispatch])
    
 
}

export default Authentication
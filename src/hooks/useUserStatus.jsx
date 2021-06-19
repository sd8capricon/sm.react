import axios from "axios";
import { useState, useMemo } from "react";

export default function useUserStatus(token){
    const [status, setStatus] = useState();
    const [error, setError] = useState();
    useMemo(()=>{
        console.log("Called stat")
        axios.post('http://localhost:5000/auth/verifyToken', {
            token: token
        }).then((res)=>{
            if(res.data.isAuthenticated){
                setStatus(res.data.isAuthenticated);
            }else{
                setStatus(res.data.isAuthenticated);
                setError(res.data.err);
            }
        }).catch((err)=>{
            setError(err);
        })
    },[token]);
    return [status,error];
}
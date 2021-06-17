import axios from "axios";
import { useState, useEffect } from "react";

export default function useUserStatus(token){
    const [status, setStatus] = useState(null);
    const [error, setError] = useState();
    useEffect(()=>{
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
import axios from "axios";
import { useState, useEffect } from "react";

export default function useUserStatus(token){
    const [verified, setVerified] = useState(null);
    const [err, setErr] = useState();
    useEffect(()=>{
        function handleStatus(status){
            setVerified(status)
        }
        function handleErr(err){
            setErr(err)
        }
        axios.post('http://localhost:5000/auth/verifyToken', {
            token: token
        }).then((res)=>{
            if(res.data.isAuthenticated){
                handleStatus(res.data.isAuthenticated);
            }else{
                handleStatus(res.data.isAuthenticated);
                handleErr(res.data.err);
            }
        }).catch((err)=>{
            handleErr(err);
        })
    },[token]);
    return {verified,err};
}
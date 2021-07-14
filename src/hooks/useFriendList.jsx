import axios from 'axios';
import { useState, useMemo } from "react";

export default function useFriendList(username){
    const [friendList, setFriendList] = useState([]);
    const [pendingReq, setPendingReq] = useState([]);    
    const [error, setError] = useState();

    useMemo(()=>{
        if(username!==null && username!==undefined){
            axios.get('http://localhost:5000/user/getfriends/'+username)
            .then((res)=>{
                if(res.data.friends){
                    setFriendList(res.data.friends);
                    setPendingReq(res.data.friendRequests);
                }
                else{
                    setError(res.data.err);
                }
            }).catch((err)=>{
                setError(err);
            })
        }else{
            setError("No user")
        }
    },[username]);
    return [friendList, pendingReq, error];
}
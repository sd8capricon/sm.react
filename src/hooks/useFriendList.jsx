import axios from 'axios';
import { useState, useMemo } from "react";

export default function useFriendList(username){
    const [friendList, setFriendList] = useState([]);    
    const [error, setError] = useState();

    useMemo(()=>{
        console.log('list hook called');
        axios.post('http://localhost:5000/user/getfriends',{
                username: username
        })
            .then((res)=>{
                setFriendList(res.data.friends);
            }).catch((err)=>{
                setError(err);
            })
    },[username]);
    return [friendList, error];
}
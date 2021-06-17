import axios from 'axios';
import { useEffect, useState } from "react";

export default function useFriendList(username){
    const [friendList, setFriendList] = useState([]);    
    const [error, setError] = useState();

    useEffect(()=>{
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
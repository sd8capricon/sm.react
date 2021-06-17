import axios from 'axios';
import { useEffect, useState } from "react";

export default function useFriendList(username){
    const [friendList, setFriendList] = useState([]);
    function handleFriendList(list){
        setFriendList(list)
    }
    console.log(username);
    useEffect(()=>{
        axios.post('http://localhost:5000/user/getfriends',{
            username: username
        })
            .then((res)=>{
                console.log(res.data);

            }).catch((err)=>{
                console.log(err);
            })
    }, []);
    return friendList
}
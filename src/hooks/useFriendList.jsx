import axios from 'axios';
import { useEffect, useState } from "react";

export default function useFriendList(authStaus, err, username){
    const [friendList, setFriendList] = useState([]);
    function handleFriendList(list){
        setFriendList(list)
    }
    useEffect(()=>{
        if(authStaus){
            axios.post('http://localhost:5000/user/getfriends',{
                    username: username
            })
                .then((res)=>{
                    handleFriendList(res.data.friends);
                }).catch((err)=>{
                    console.log(err);
                })
        }else{
            console.log(err);
        }
    },[authStaus, err, username]);
    return friendList;
}
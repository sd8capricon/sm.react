import { useState } from 'react';
import { useContext } from 'react';
import { SocketContext } from '../contexts/SocketContext';
import useFriendList from '../hooks/useFriendList';
import useUserStatus from '../hooks/useUserStatus';

export default function Home(){

    //IMP fix component rerenders thrice
    
    const socket = useContext(SocketContext);
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('userToken');    
    const [friends, getFriendError] = useFriendList(username);
    const [verified, verificationError] = useUserStatus(token);
    const [activeUsers, setActiveUsers] = useState([]);
    if(verified){
        console.log("connected");
        socket.auth = { username };
        socket.connect();
    }

    socket.on("users", (users)=>{
        console.log(users.length);
        users = users.filter(user => user.username!==username);
        setActiveUsers(users)
    });

    return(
        <div>
            <h1>{verified? "hello" : "login first"}</h1>
            <h2>Your Friends</h2>
            {verified? <ol>
                {friends.map((friends, index)=>{return(<li key={index}>{friends.username}</li>);})}
            </ol>: <p></p>}
            <h2>Your Online Friends</h2>
            <ol>
                {activeUsers.map((user, index)=>{return(<li key={index}>{user.username}</li>)})}
            </ol>
        </div>
    );
}
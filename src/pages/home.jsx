import { useContext, useMemo, useState } from 'react';
import { SocketContext } from '../contexts/SocketContext';
import useFriendList from '../hooks/useFriendList';
import useUserStatus from '../hooks/useUserStatus';
import FriendList from '../components/FriendList';

export default function Home(){

    //IMP fix component rerenders thrice
    
    const socket = useContext(SocketContext);
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('userToken');    
    const [friends, getFriendError] = useFriendList(username);
    const [verified, verificationError] = useUserStatus(token);
    const [activeUsers, setActiveUsers] = useState([]);

    useMemo(()=>{
        if(verified){            
            console.log("user now verified now connecting");
            socket.auth = { username };
            socket.connect();
        }
        else{
            console.log('user not yet verified');
        }
    },[verified, socket, username])

    socket.on("users", (users)=>{
        users = users.filter(user => user.username!==username);
        setActiveUsers(users)
    });
    socket.on("friend connected", (user)=>{
        const newUserList = [...activeUsers, user];
        setActiveUsers(newUserList)
    });
    socket.on("friend disconnected", (disconnect)=>{
        const newUserList = activeUsers.filter(user => user.username!==disconnect.username);
        setActiveUsers(newUserList)
    });

    return(
        <div>
            {/* <h1>{verified? "hello" : "login first"}</h1>
            <h2>Your Friends</h2>
            {verified? <ol>
                {friends.map((friends, index)=>{return(<li key={index}>{friends.username}</li>);})}
            </ol>: <p></p>}
            <h2>Your Online Friends</h2>
            <ol>
                {activeUsers.map((user, index)=>{return(<li key={index}>{user.username}</li>)})}
            </ol> */}
            <FriendList verified={verified} friends={friends} activeUsers={activeUsers}/>
        </div>
    );
}
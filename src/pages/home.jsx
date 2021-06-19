import { useContext, useMemo, useState } from 'react';
//Contexts
import { SocketContext } from '../contexts/SocketContext';
import { SelectedFriendContext } from '../contexts/SelectedFriendContext';
//Hooks
import useFriendList from '../hooks/useFriendList';
import useUserStatus from '../hooks/useUserStatus';
//Components
import FriendList from '../components/FriendList';

export default function Home(){
    
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
            <SelectedFriendContext.Provider value={"Sid"}>
                
                <FriendList verified={verified} friends={friends} activeUsers={activeUsers}/>
            </SelectedFriendContext.Provider>
        </div>
    );
}
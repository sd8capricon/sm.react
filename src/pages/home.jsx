import { useContext } from 'react';
import { SocketContext } from '../contexts/SocketContext';
import useFriendList from '../hooks/useFriendList';
import useUserStatus from '../hooks/useUserStatus';

export default function Home(){

    //IMP fix component rerenders thrice
    
    const socket = useContext(SocketContext);
    const token = localStorage.getItem('userToken');
    const username = localStorage.getItem('username');    
    const [friends, getFriendError] = useFriendList(username);
    const [verified, verificationError] = useUserStatus(token);
    console.log(verified);
    if(verified){
        console.log("connected");
        socket.auth = { username };
        socket.connect();
    }
    console.log(friends);

    return(
        <div>
            <h1>{verified? "hello" : "login first"}</h1>
            <ol>
                {friends.map((friends ,index)=>{return(<li key={index}>{friends.username}</li>);})}
            </ol>
        </div>
    );
}
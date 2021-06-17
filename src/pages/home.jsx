import { useContext } from 'react';
import { SocketContext } from '../contexts/SocketContext';
import useFriendList from '../hooks/useFriendList';
import useUserStatus from '../hooks/useUserStatus';

export default function Home(){

    //IMP fix component rerenders thrice

    const socket = useContext(SocketContext);
    const token = localStorage.getItem('userToken');
    const username = localStorage.getItem('username');
    const {verified, err} = useUserStatus(token);
    
    const list = useFriendList(verified, err,username);
    if(verified){
        console.log("connected");
        socket.auth = { username };
        socket.connect();
    }
    else if(err){
        console.log(err);
    }
    console.log(list);

    return(
        <div>
            <h1>{verified? "hello" : "login first"}</h1>
            <ol>
                {list.map((friend ,index)=>{return(<li key={index}>{friend.username}</li>);})}
            </ol>
        </div>
    );
}
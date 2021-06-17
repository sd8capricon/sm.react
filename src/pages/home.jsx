import { useContext } from 'react';
import { SocketContext } from '../contexts/SocketContext';
import useFriendList from '../hooks/useFriendList';
import useUserStatus from '../hooks/useUserStatus';

export default function Home(){
    const socket = useContext(SocketContext);
    const token = localStorage.getItem('userToken');
    const username = localStorage.getItem('username');
    const {verified, err} = useUserStatus(token);
    console.log(username);
    const friendList = useFriendList(username);
    if(verified){
        socket.auth = { username };
        socket.connect();
    }
    else if(err){
        console.log(err);
    }
    return(
        <div>
            <h1>{verified? "hello" : "login first"}</h1>
        </div>
    );
}
import { useContext, useMemo, useState } from 'react';
//Contexts
import { SocketContext } from '../contexts/SocketContext';
import { SelectedFriendContext } from '../contexts/SelectedFriendContext';
//Hooks
import useFriendList from '../hooks/useFriendList';
import useUserStatus from '../hooks/useUserStatus';
//React Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
                    <Row>
                        <Col md={4} lg={4}>
                            <FriendList verified={verified} friends={friends} activeUsers={activeUsers}/>
                        </Col>
                        <Col md={8} lg={8}>
                            <div style={{backgroundColor: 'red'}}>color</div>
                        </Col>
                    </Row>
            </SelectedFriendContext.Provider>
        </div>
    );
}
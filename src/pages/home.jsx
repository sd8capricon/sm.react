import { useContext, useMemo, useState } from 'react';
//Contexts
import { SocketContext } from '../contexts/SocketContext';
import { SelectedFriendContext } from '../contexts/SelectedFriendContext';
//Hooks
import useFriendList from '../hooks/useFriendList';
import useUserStatus from '../hooks/useUserStatus';
//Components
import FriendList from '../components/FriendList';
import ChatSection from '../components/ChatSection';
import Login from '../components/Login';
//React Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';


export default function Home(){
    
    const socket = useContext(SocketContext);
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('userToken');    
    //calling hooks
    const [friends, pendingReq, getFriendError] = useFriendList(username);
    const [verified, verificationError] = useUserStatus(token);
    //state
    const [loading, setLoading] = useState(true)
    const [activeUsers, setActiveUsers] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState();
    const [selectedFriendId, setSelectedFriendId] = useState();
    const friendData = {selectedFriend, selectedFriendId}
    
    useMemo(()=>{
        if(verified){            
            console.log("user now verified now connecting");
            setLoading(false)
            socket.auth = { username };
            socket.connect();
        }
        else{
            console.log('user not yet verified');
        }
    },[verified, socket, username])

    //socket
    useMemo(()=>{
        socket.on("users", (users)=>{
            users = users.filter(user => user.username!==username);
            setActiveUsers(users)
        });
        socket.on("friend connected", (user)=>{
            const newUserList = [...activeUsers, user];
            setActiveUsers(newUserList)
            if(user.username === selectedFriend){
                setSelectedFriendId(user.userId)
            }
        });
        socket.on("friend disconnected", (disconnect)=>{
            const newUserList = activeUsers.filter(user => user.username!==disconnect.username);
            setActiveUsers(newUserList)
        });
    },[activeUsers, socket, username, selectedFriend])
    

    
    if(verificationError || getFriendError){
        return(
            <div>
                <h1 style={{textAlign:"center", margin:"1%"}}>Secured Messenger</h1>
                <Login/>
            </div>
        );
    }
    else{
        if(!loading){
                return(
                    <SelectedFriendContext.Provider value={friendData}>
                        <Container fluid>
                            <Row>
                                <Col className="friendList" sm={3} md={3} lg={3}>
                                    <FriendList self={username} friends={friends} activeUsers={activeUsers} setSelectedFriend={setSelectedFriend} setSelectedFriendId={setSelectedFriendId}/>
                                </Col>
                                <Col className="chat" sm={9} md={9} lg={9}>
                                    <ChatSection/>
                                </Col>
                            </Row>
                        </Container>
                    </SelectedFriendContext.Provider>
                );
        }
        else{
            return("loading")
        }
    }
}
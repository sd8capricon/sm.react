import { useContext, useMemo, useState } from 'react';
//Contexts
import { SocketContext } from '../contexts/SocketContext';
import { SelectedFriendContext } from '../contexts/SelectedFriendContext';
//Hooks
import useFriendList from '../hooks/useFriendList';
import useUserStatus from '../hooks/useUserStatus';
//React Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//Components
import FriendList from '../components/FriendList';
import ChatSection from '../components/ChatSection';

export default function Home(){
    
    const socket = useContext(SocketContext);
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('userToken');    
    //calling hooks
    const [friends, getFriendError] = useFriendList(username);
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
            console.log(users);
            setActiveUsers(users)
        });
        socket.on("friend connected", (user)=>{
            console.log(user);
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
            <div>"User Validation Error"</div>
        );
    }
    else{
        if(!loading){
                return(
                    <div>
                        <SelectedFriendContext.Provider value={friendData}>
                                <Row>
                                    <Col sm={4} md={4} lg={4}>
                                        <FriendList friends={friends} activeUsers={activeUsers} setSelectedFriend={setSelectedFriend} setSelectedFriendId={setSelectedFriendId}/>
                                    </Col>
                                    <Col sm={8} md={8} lg={8}>
                                        <ChatSection/>
                                    </Col>
                                </Row>
                        </SelectedFriendContext.Provider>
                    </div>
                );
        }
        else{
            return("loading")
        }
    }
}
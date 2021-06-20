import React, { useContext, useState, useEffect } from "react";
import { SelectedFriendContext } from "../contexts/SelectedFriendContext";
//React Bootstrap
import Button from 'react-bootstrap/Button';
// import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SocketContext } from "../contexts/SocketContext";

export default React.memo(function ChatSection({from}){

    const selectedUser = useContext(SelectedFriendContext);
    const socket = useContext(SocketContext);
    const friend = selectedUser.selectedFriend;
    const friendId = selectedUser.selectedFriendId;
    const [content, setContent] = useState('');
    const [messages, setMessages] = useState([]);
    const [userMessages, setUserMessage] = useState([]);

    function handleContent(e){
        setContent(e.target.value)
    }

    function sendMessage(){
        socket.emit("private message", {content: content, id:friendId})
        setContent('')
        const myMessage = {
            content: content,
            fromUsername: "You"
        }
        setMessages([...messages, myMessage])
    }

    useEffect(()=>{
        socket.on("incoming private message", (dat)=>{
            setMessages([...messages, dat])
        })
    },[socket, messages])

    if(friend){
        return(
            <div>
                <h3>{friend}</h3>
                <div style={{padding: 25}}>
                    <Row>
                        <ul className="ul-scroll">{messages.map((message, index)=>{return(<li key={index}><h5>{message.fromUsername}</h5>{message.content}</li>)})}</ul>
                    </Row>
                    <Row>
                        <Col><Form.Control value={content} onChange={handleContent}/></Col>
                        <Col><Button onClick={sendMessage}>Send</Button></Col>
                    </Row>
                </div>
            </div>
        );
    }
    else{
        return(
            <div>
                <h3>Select An User</h3>
            </div>
        );
    }
})
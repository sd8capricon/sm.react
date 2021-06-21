import React, { useContext, useState, useEffect } from "react";
import { SelectedFriendContext } from "../contexts/SelectedFriendContext";
import { SocketContext } from "../contexts/SocketContext";
//React Bootstrap
import Button from 'react-bootstrap/Button';
// import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';

export default React.memo(function ChatSection(){

    const selectedUser = useContext(SelectedFriendContext);
    const socket = useContext(SocketContext);
    const friend = selectedUser.selectedFriend;
    const friendId = selectedUser.selectedFriendId;
    const [content, setContent] = useState('');
    const [messages, setMessages] = useState([]);

    function handleContent(e){
        setContent(e.target.value)
    }

    function sendMessage(e){
        e.preventDefault();
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
                <h3 className="chat-friend">{friend}</h3>
                <div>
                    <Row>
                        <div className="chat-messages-window">
                            <ul>{messages.map((message, index)=>{return(<li key={index}><h5>{message.fromUsername}</h5>{message.content}</li>)})}</ul>
                        </div>
                    </Row>
                    <Row className="chat-input-window">
                        <Form className="chat-input-form" onSubmit={sendMessage}>
                            <Form.Control className="chat-input" value={content} onChange={handleContent} placeholder="Enter Your Message Here"/>
                            <Button className="chat-input-button" onClick={sendMessage}>Send</Button>
                        </Form>
                    </Row>
                </div>
            </div>
        );
    }
    else{
        return(
            <div>
                <h3 className="chat-friend">Select An User</h3>
            </div>
        );
    }
})
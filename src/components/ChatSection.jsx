import React, { useContext } from "react";
import { SelectedFriendContext } from "../contexts/SelectedFriendContext";
//React Bootstrap
import Button from 'react-bootstrap/Button';
// import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default React.memo(function ChatSection(){

    const selectedUser = useContext(SelectedFriendContext);
    const user = selectedUser.selectedFriend

    if(user){
        return(
            <div>
                <h3>{user}</h3>
                <div style={{padding: 25}}>
                    <Row>
                        <Col><Form.Control/></Col>
                        <Col><Button>Send</Button></Col>
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
});
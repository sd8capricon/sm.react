import { useState, useMemo } from "react";
import axios from "axios";
//Custom Hooks
import useFriendList from "../hooks/useFriendList";
import useUserStatus from "../hooks/useUserStatus";
//components
import Login from "../components/Login";
import Friends from "../components/Friends";
//react bootstrap
import { Button, Form } from "react-bootstrap";

export default function FriendsPage(){
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('userToken');    
    //calling hooks
    const [friends, pendingReq, getFriendError] = useFriendList(username);
    const [verified, verificationError] = useUserStatus(token);
    //state
    const [loading, setLoading] = useState(true);
    let [toUser, setToUser] = useState('');
    const [reqError, setReqError] = useState();

    useMemo(()=>{
        if (verified){
            setLoading(false)
        }else if(!verified){
            console.log("User Not yet verified")
        }
    },[verified]);

    function sendReq(e){
        e.preventDefault();
        axios.post('http://localhost:5000/user/sendRequest', { from: username, to:  toUser})
            .then((res)=>{
                if(res.data.error){
                    console.log(res.data.error)
                    setReqError(res.data.error)
                }else{
                    console.log(res.data.message)
                }
            }).catch(err=>console.log(err))
        setToUser('')
    }

    function acceptReq(e){
        axios.post('http://localhost:5000/user/acceptRequest', { receiver: username, from: e.target.name })
        .then((res)=>{
            if(res.data.error){
                console.log(res.data.error)
            }
        })
        window.location.reload();
    }

    function declineReq(e){
        axios.post('http://localhost:5000/user/declineRequest', { user: username, del: e.target.name })
        .then((res)=>{
            if(res.data.error){
                console.log(res.data.error)
            }
        })
        window.location.reload();
    }

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
                <div>
                    <h1>Friends Page</h1>
                    <Form onSubmit={sendReq}>
                        <Form.Control className="input" value={toUser} onChange={e=>setToUser(e.target.value)}/>
                        <Button type='submit'>Submit</Button>
                    </Form>
                    {
                        reqError? <h4 style={{ color: "red" }}>{reqError}</h4>: <></>
                    }
                    <h2>Your Pending Friend Requests</h2>
                    {
                        pendingReq.map((req, index)=>{
                            return(
                                    <div className="req">
                                        <li className="" id={index}>{req.username}</li>
                                        <Button className="button" name={req.username} onClick={acceptReq}>Accept</Button>
                                        <Button className="button" name={req.username} onClick={declineReq}>Decline</Button>
                                    </div>
                                );
                        })
                    }
                    <h2>Your Friends</h2>
                    <Friends className="" friends={friends}/>                    
                </div>
            );
        }
        else{
            return(
                <h1>Loading</h1>
            );
        }
    }
}
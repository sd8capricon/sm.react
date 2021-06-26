import { useState } from "react";
//Custom Hooks
import useFriendList from "../hooks/useFriendList";
import useUserStatus from "../hooks/useUserStatus";
//components
import Login from "../components/Login";
import Friends from "../components/Friends";
//react bootstrap
import { Form } from "react-bootstrap";
import { useMemo } from "react";

export default function FriendsPage(){
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('userToken');    
    //calling hooks
    const [friends, getFriendError] = useFriendList(username);
    const [verified, verificationError] = useUserStatus(token);
    //state
    const [loading, setLoading] = useState(true)

    useMemo(()=>{
        if (verified){
            setLoading(false)
        }else{
            console.log("User Not yet verified")
        }
    },[verified])

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
                    <Form>
                        <Form.Control className="input"/>
                    </Form>
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
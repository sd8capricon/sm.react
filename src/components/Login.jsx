import axios from "axios";
import { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";


export default function Login(){

    const[username, setUserName] = useState('');
    const[password, setPassword] = useState('');
    const[isError, setIsError]=useState(false);
    const[err, setErr]=useState('');

    function handleUsername(e){
        setUserName(e.target.value);
    }
    function handlePassword(e){
        setPassword(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        axios.post('http://localhost:5000/auth/login', {
            username: username,
            password: password
        }).then((res)=>{
            console.log(res.data);
            if(res.data.isAuthenticated === true){
                window.localStorage.setItem('username', res.data.user.username);
                window.localStorage.setItem('userToken', res.data.token);
                window.location='/';
            }
            if(res.data.isAuthenticated === false){
                setIsError(true)
                setErr(res.data.error);
            }
        }).catch((err)=>{
            console.log(err);
            setIsError(true);
            setErr('Error Connecting To Server')
        });;
    }
    return(
        <Form className="Login-Form" onSubmit={handleSubmit}>
            <h2>Login</h2><br/>
            <Form.Label>Username</Form.Label><br/>
            <Form.Control type="text" value={username} onChange={handleUsername}/><br/>
            <Form.Label>Password</Form.Label><br/>
            <Form.Control type="password" autoComplete="on"value={password} onChange={handlePassword}/><br/>
            <Button type="submit">Log In</Button><Link to="/" style={{color:"white", marginLeft:"21%"}}>New User? Register Here</Link><br/><br />
            {isError?<label>{err}</label>: <label> </label>}
        </Form>
    );
}
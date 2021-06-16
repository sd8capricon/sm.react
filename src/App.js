import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import io from "socket.io-client";
import './App.css';

//Pages
import Home from "./pages/home";
import LogIn from "./pages/login";

function App() {
  const socket = io('http://localhost:5000', {autoConnect: false});
  const [message, setMessage] = useState('');
  socket.on('message', (data)=>{
    setMessage(data);
  })
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={LogIn}/>
      </Switch>
    </Router>
  );
}

export default App;

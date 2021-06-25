import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { socket, SocketContext } from "./contexts/SocketContext";
import './App.css';

//Pages
import Home from "./pages/home";
import Login from "./pages/LoginPage";
import FriendsPage from "./pages/FriendsPage";


function App() {

  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/friends' component={FriendsPage}/>
        </Switch>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;

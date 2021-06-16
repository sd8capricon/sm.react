import { useState } from "react";
import io from "socket.io-client";
import './App.css';

function App() {
  const socket = io('http://localhost:5000');
  const [message, setMessage] = useState('');
  socket.on('message', (data)=>{
    setMessage(data);
  })
  return (
    <div>
      <h1>Frontend</h1>
      <h2>{message}</h2>
    </div>
  );
}

export default App;

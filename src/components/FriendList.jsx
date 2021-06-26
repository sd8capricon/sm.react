import React from "react";
//react-router
import { Link } from "react-router-dom";
//componets
import Friends from "./Friends";

export default React.memo(function FriendList({ self, friends, activeUsers, setSelectedFriend, setSelectedFriendId }){
    function handleSelection(e){
        setSelectedFriend(e.target.innerText); //alt e.target.name
        setSelectedFriendId(e.target.value)
    }
    return(
        <div>
            <h1 className="friend-user">Hello {self}</h1>
            <h2 className="friend-stat">Your Friends &nbsp;&nbsp;<Link to="/friends" style={{color:"inherit"}}><i className="bi bi-person-plus-fill"/></Link></h2>
            <Friends className="friend-user-list friend-user-button" friends={friends}/>
            
            <h2 className="friend-stat">Your Online Friends</h2>
            {activeUsers.map((user, index)=>{
                    const id=user.userId;
                    const username=user.username;
                    return(
                        <li className="friend-user-list" key={index}>
                            <button className="friend-user-button active-button" onClick={handleSelection} name={username} value={id}>{username}</button>
                        </li>
                    )
                })
            }
        </div>
    );
})
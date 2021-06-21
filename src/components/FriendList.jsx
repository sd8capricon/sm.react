import React from "react";

export default React.memo(function FriendList({ self, friends, activeUsers, setSelectedFriend, setSelectedFriendId }){
    function handleSelection(e){
        setSelectedFriend(e.target.innerText); //alt e.target.name
        setSelectedFriendId(e.target.value)
    }
        return(
            <div>
                <h1 className="friend-user">Hello {self}</h1>
                <h2 className="friend-stat">Your Friends</h2>
                {friends.map((friends, index)=>{return(<li className="friend-element" key={index}>{friends.username}</li>)})}
                <h2>Your Online Friends</h2>
                {activeUsers.map((user, index)=>{ 
                        const id=user.userId; 
                        const username=user.username;  
                        return(
                                <li className="friend-element" key={index}>
                                    <button onClick={handleSelection} name={username} value={id}>{username}</button>
                                </li>
                            )
                    })
                }
            </div>
        );
})
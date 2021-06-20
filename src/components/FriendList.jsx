import React from "react";

export default function FriendList({ friends, activeUsers, setSelectedFriend, setSelectedFriendId }){
    console.log('friend');
    function handleSelection(e){
        console.log('friend id '+e.target.value)
        setSelectedFriend(e.target.innerText); //alt e.target.name
        setSelectedFriendId(e.target.value)
    }
        return(
            <div>
                <h2>Your Friends</h2>
                {friends.map((friends, index)=>{return(<li key={index}>{friends.username}</li>)})}
                <h2>Your Online Friends</h2>
                {activeUsers.map((user, index)=>{ 
                        const id=user.userId; 
                        const username=user.username;  
                        return(
                                <li key={index}>
                                    <button  onClick={handleSelection} name={username} value={id}>{username}</button>
                                </li>
                            )
                    })
                }
            </div>
        );
}
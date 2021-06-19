import React from "react";

export default React.memo(function FriendList({ friends, activeUsers, setSelectedUser }){
    console.log('frien');
    function handleSelection(e){
        setSelectedUser(e.target.value);
    }
        return(
            <div>
                <h2>Your Friends</h2>
                {friends.map((friends, index)=>{return(<li key={index}>{friends.username}</li>)})}
                <h2>Your Online Friends</h2>
                {activeUsers.map((user, index)=>{return(<li key={index}><button onClick={handleSelection} value={user.username}>{user.username}</button></li>)})}
            </div>
        );
})
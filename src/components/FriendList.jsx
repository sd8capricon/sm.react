import { useContext } from "react";
import { SelectedFriendContext } from "../contexts/SelectedFriendContext";

export default function FriendList({ verified, friends, activeUsers, setSelectedUser }){
    const SelectedFriend = useContext(SelectedFriendContext);
    function handleSelection(e){
        setSelectedUser(e.target.value);
    }
    console.log(SelectedFriend);
    if(verified){
        return(
            <div>
                <h2>Your Friends</h2>
                {friends.map((friends, index)=>{return(<li key={index}>{friends.username}</li>)})}
                <h2>Your Online Friends</h2>
                {activeUsers.map((user, index)=>{return(<li key={index}><button onClick={handleSelection} value={user.username}>{user.username}</button></li>)})}
            </div>
        );
    }else{
        return(
            <h1>Not Logged In</h1>
        );
    }
}
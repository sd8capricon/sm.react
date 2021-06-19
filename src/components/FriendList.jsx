import { useContext } from "react";
import { SelectedFriendContext } from "../contexts/SelectedFriendContext";

export default function FriendList({ verified, friends, activeUsers }){
    const SelectedFriend = useContext(SelectedFriendContext);
    console.log(SelectedFriend);
    if(verified){
        return(
            <div>
                <h2>Your Friends</h2>
                {friends.map((friends, index)=>{return(<li key={index}>{friends.username}</li>)})}
                <h2>Your Online Friends</h2>
                {activeUsers.map((user, index)=>{return(<li key={index}>{user.username}</li>)})}
            </div>
        );
    }else{
        return(
            <h1>Not Logged In</h1>
        );
    }
}
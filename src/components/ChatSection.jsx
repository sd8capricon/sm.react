import { useContext } from "react";
import { SelectedFriendContext } from "../contexts/SelectedFriendContext";

export default function ChatSection(){
    const selectedUser = useContext(SelectedFriendContext);
    if(selectedUser){
        return(
            <div>
                <h3>{selectedUser}</h3>
            </div>
        );
    }
    else{
        return(
            <div>
                <h3>Select An User</h3>
            </div>
        );
    }
}
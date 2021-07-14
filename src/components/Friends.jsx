export default function Friends({friends, className}){
    return(
        friends.map((friends, index)=>{
            return(
                    <li className={className} key={index}>
                        {friends.username}
                    </li>
                )
            }
        )
    );
}  
import useUserStatus from '../hooks/useUserStatus';

export default function Home(){
    const token = localStorage.getItem('admin');
    const {isAuthenticated, err} = useUserStatus(token);
    if(err){
        console.log(err);
    }
    return(
        <div>
            <h1>{isAuthenticated? "hello" : "login first"}</h1>
        </div>
    );
}
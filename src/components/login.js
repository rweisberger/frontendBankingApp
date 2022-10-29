import { useState, useContext } from "react";
import UserContext from "./context";
import Card from "./card";
import AlertComponent from "./alert";

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);
    const {activeUser, setActiveUser, setAccessEmail, setUserAdminStatus} = useContext(UserContext);

    function findUser(){
        fetch(`/account/login/${email}/${password}`)
        .then(response => response.text())
        .then(text => {
            try {
                console.log(email, password);
                const data = JSON.parse(text);
                setActiveUser(data.name);
                setAccessEmail(data.email);
                setUserAdminStatus(data.isAdmin);
                console.log('JSON:', data);
            } catch(err) {
                setOpen(true);
                setActiveUser(null);
                console.log('err:', text);
            }
        });
    }

    const logoutUser = () => {
        // console.log(ctx);
        setActiveUser(null);
        setEmail('');
        setPassword('');
    };

    return(
        <div className="container">
            <Card 
                bgcolor="info"
                header="Login"
                body={!activeUser ? (
                    <>
                    Email address<br/> 
                    <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                    Password<br/> 
                    <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                    <button type="submit" className="btn btn-light" onClick={findUser}>Login</button>
                        <AlertComponent open={open} message="User not found" type= "error" onClose={()=> setOpen(false)} />
                    </>
                ) : (
                    <>
                    Welcome {activeUser}!<br/><br/>
                    <button type="submit" className="btn btn-light" onClick={logoutUser}>Logout</button>
                    </>
                )
                } 
            />
        </div>
    );
}

export default Login;
import { useState, useContext } from "react";
import UserContext from "./context";
import Card from "./card";
import AlertComponent from "./alert";

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [activeUser, setActiveUser] = useState('');
    const [open, setOpen] = useState(false);
    const ctx = useContext(UserContext);

    // button needs onClick to find user
    // use state to keep track of login status 
    // use ternary operator to display logout?

    function findUser(){
    //     let data = ctx.users;
    //     let matchingUser = data.find(user => loginEmail === user.email && loginPassword === user.password);
        // ctx.setActiveUser(matchingUser);
    //     if(matchingUser === undefined){
    //         setOpen(true);
    //     };   
    // }
        fetch(`http://localhost:5000/account/login/${email}/${password}`)
        .then(response => response.text())
        .then(text => {
            try {
                console.log(email, password);
                const data = JSON.parse(text);
                ctx.setActiveUser(data.name);
                ctx.setAccessEmail(data.email);
                console.log('JSON:', data);
            } catch(err) {
                setOpen(true);
                ctx.setActiveUser(null);
                console.log('err:', text);
            }
        });
    }

    const logoutUser = () => {
        console.log(ctx);
        ctx.setActiveUser(null);
        setEmail('');
        setPassword('');
    };

    // for logoutUser I tried to clear the form with document.getElementById('email').value='' in find user and in the logout user, but it did not work, probably because the fields were not present when the lines of code were read and errors were thrown. Since I used the ternary operator to display two forms of the card, i followed Abel's example and reset the state to ''

    return(
        <div className="container">
            <Card 
                bgcolor="info"
                header="Login"
                body={!ctx.activeUser ? (
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
                    Welcome {ctx.activeUser}!<br/><br/>
                    <button type="submit" className="btn btn-light" onClick={logoutUser}>Logout</button>
                    </>
                )
                } 
            />
        </div>
    );
}

export default Login;
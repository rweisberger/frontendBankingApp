import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./context";
import Card from "./card";
import AlertComponent from "./alert";

function DeleteAccount(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [activeUser, setActiveUser] = useState('');
    const [open, setOpen] = useState(false);
    const ctx = useContext(UserContext);
   
    function deleteUser(){
        fetch(`http://localhost:5000/account/delete/${email}/${password}`)
        .then(response => response.text())
        .then(text => {
            try {
                console.log(email, password);
                const data = JSON.parse(text);
                console.log('JSON:', data);
                navigate('/CreateAccount')
            } catch(err) {
                setOpen(true);
                ctx.setActiveUser(null);
                console.log('err:', text);
            }
        });
    }

    return(
        <div className="container">
            <Card 
                bgcolor="info"
                header="Login"
                body={
                    <>
                    Email address<br/> 
                    <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                    Password<br/> 
                    <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                    <button type="submit" className="btn btn-light" onClick={deleteUser}>Delete Account</button>
                    <div class="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                        <label className="form-check-label" for="flexCheckChecked">
                            Please delete my account
                        </label>
                    </div>
                        <AlertComponent open={open} message="User not found" type= "error" onClose={()=> setOpen(false)} />
                    </>
                } 
            />
        </div>
    );
}

export default DeleteAccount;
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./context";
import Card from "./card";
import AlertComponent from "./alert";

function DeleteAccount(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [open, setOpen] = useState(false);
    const ctx = useContext(UserContext);

    useEffect(() => {
        if(ctx.activeUser === null){
          navigate('/login');
        }
    }, []);
   
    function deleteUser(){    
        if(confirm){  
            fetch(`/account/delete/${email}/${password}`, { method: 'DELETE' })
            .then(response => response.text())
            .then(data => {
                try {
                    console.log(email, password);
                    // const data = JSON.parse(text);
                    // console.log('data:', data);
                    ctx.setActiveUser(null);
                    navigate('/CreateAccount');
                } catch(err) {
                    setOpen(true);
                    ctx.setActiveUser(null);
                    console.log('err:', data);
                }
            });
        } else {
            console.log("account not deleted. Confirm =", confirm)
        }
    }

    return(
        <div className="container">
            <Card 
                bgcolor="info"
                header="Delete Account"
                body={
                    <>
                    Email address<br/> 
                    <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
                    Password<br/> 
                    <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)}/><br/>
                    <button type="submit" className="btn btn-light" onClick={deleteUser}>Delete Account</button><br/>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value={confirm} onChange={e => setConfirm(!confirm)} id="flexCheckChecked"/>
                        <label className="form-check-label" htmlFor="flexCheckChecked">
                            I understand that my account will be permanently deleted.
                        </label>
                    </div>
                        <AlertComponent open={open} message="User not found" type= "error" onClose={()=> setOpen(!confirm)} />
                    </>
                } 
            />
        </div>
    );
}

export default DeleteAccount;
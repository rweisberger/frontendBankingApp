import { useState, useContext } from "react";
import UserContext from "./context";
import AlertComponent from "./alert";
import Card from "./card";

function CreateAccount(){
    const [showCreateAccount, setShowCreateAccount] = useState(true);
    const [name, setName]                           = useState('');
    const [email, setEmail]                         = useState('');
    const [password, setPassword]                   = useState('');
    const [isAdmin, setIsAdmin]                     = useState(false);
    const [open, setOpen]                           = useState(false);
    const [message, setMessage]                     = useState('')    
    const ctx                                       = useContext(UserContext);

    function validate(field, label){
        if(!field){
            // setStatus('Error: ' + label + ' required');
            // setTimeout(()=> setStatus(''),3000);
            setMessage('Error: ' + label + ' required');
            setOpen(true);
            return false;
        }
        if(field === password && field.length < 8){
            setMessage('Error: Password must be 8 or more characters long');
            setOpen(true);
            return false;
        }
        if(field === email){
            //The pattern below was take from https://www.w3schools.blog/email-validation-javascript-js
            var emailFormat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if(field.match(emailFormat)){
                return true
            }else{
                setMessage('Error: Enter a valid email address');
                setOpen(true);
                return false;
            }
        }
        setMessage('Account created successfully!');
        setOpen(true);
        return true;
    }

    function handleCreate(){
        if(!validate(name,'name')) return;
        if(!validate(email, 'email')) return;
        if(!validate(password, 'password')) return;
        
        const url = '/account/create';
        (async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({name, email, password, isAdmin})
            };

            var res  = await fetch(url, requestOptions);
            var data = await res.json();    
            // console.log(data);        
        })();
        setShowCreateAccount(false);
    }

    function clearForm(){
        setOpen(false);
        setName('');
        setEmail('');
        setPassword('');
        setShowCreateAccount(true);
    }
console.log(isAdmin)
    return(
        <div className="container">
            <Card
                bgcolor="info"
                header="Create Account"
                // status={status}
                body={showCreateAccount ? (
                    <>
                    Name<br/>
                    <input type="input" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
                    Email address<br/> 
                    <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br/>
                    Password<br/> 
                    <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br/>
                    <button type="submit" className="btn btn-light" onClick={handleCreate} disabled={name || email || password ? false : true}>Create Account</button><br/>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" value={isAdmin} onChange={e => setIsAdmin(!isAdmin)} id="flexCheckChecked"/>
                        <label className="form-check-label" htmlFor="flexCheckChecked">
                            Request admin privileges.
                        </label>
                    </div>
                    <AlertComponent open={open} message={message} type="error" onClose={()=> setOpen(false)} />
                    </>
                ):(
                    <>
                     <AlertComponent open={open} message={message} type="success" onClose={()=> setOpen(false)} />
                    <h5>Success</h5>
                    <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button> 
                    </>
                )}
            />
        </div>
    );
}

export default CreateAccount;
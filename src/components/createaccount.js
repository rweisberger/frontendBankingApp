import React,  { useState, useContext } from "react";
import { UserContext, Card } from "./context";


function CreateAccount(){
    const [show, setShow]         = useState(true);
    const [status, setStatus]     = useState('');
    const [name, setName]         = useState('');
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const ctx = useContext(UserContext);


    function validate(field, label){
        if(!field){
            setStatus('Error: ' + label + ' required');
            setTimeout(()=> setStatus(''),3000);
            return false;
        }
        if(field === password && field.length < 8){
            alert('Password must be 8 or more characters long');
            return false;
        }
        if(field === email){
            //The pattern below was take from https://www.w3schools.blog/email-validation-javascript-js
            var emailFormat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if(field.match(emailFormat)){
                return true
            }else{
                alert('Enter a valid email address');
                return false;
            }
        }

        return true;
    }

    function handleCreate(){
        // console.log(name, email, password);
        if(!validate(name,'name')) return;
        if(!validate(email, 'email')) return;
        if(!validate(password, 'password')) return;
        ctx.setUsers((existingState) => [
            ...existingState,
            { name, email, password, balance: 100 },
          ]);
        alert('Successfully created account!');
        setShow(false);
    }

    function clearForm(){
        setName('');
        setEmail('');
        setPassword('');
        setShow(true);
    }

    return(
        <div className="container">
            <Card 
                bgcolor="info"
                header="Create Account"
                status={status}
                body={show ? (
                    <>
                    Name<br/>
                    <input type="input" className="form-control" id="name" placeholder="Enter Name" value={name} onChange={e => setName(e.currentTarget.value)} /><br/>
                    Email address<br/> 
                    <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br/>
                    Password<br/> 
                    <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br/>
                    <button type="submit" className="btn btn-light" onClick={handleCreate} disabled={name || email || password ? false : true}>Create Account</button>
                    </>
                ):(
                    <>
                    <h5>Success</h5>
                    <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button> 
                    </>
                )}
            />
        </div>
    );
}

export default CreateAccount;
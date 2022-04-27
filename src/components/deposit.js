import React,  { useState, useContext } from "react";
import { UserContext, Card } from "./context";

function Deposit(){
    const [depositAmount, setDepositAmount] = useState(0)
    const ctx = useContext(UserContext);
    let activeUser = ctx.activeUser;
    // console.log('deposit amount:',typeof depositAmount);

function makeDeposit(){
    // console.log(typeof activeUser.balance);
    // console.log('deposit amount:',typeof depositAmount);
    if(depositAmount > 0) {
        activeUser.balance += depositAmount;
        alert('The deposit was successfully received.');  
    } else {
        alert('Deposit values cannot be negative.');
    };  
    setDepositAmount(0);
    document.getElementById('deposit').value='';
    // the last two lines make the balance update, by changing state, and reset the input field
}

    return(
        <div className="container">
            <Card 
                bgcolor="info"
                header="Deposit"
                body={
                    <>
                    Account Balance : $  {activeUser ? activeUser.balance : '--'}<br/><br/>  
                    Deposit Amount<br/> 
                    <input type="number" className="form-control" id="deposit" placeholder="Enter amount" onChange={e => setDepositAmount(Number(e.currentTarget.value))} /><br/>
                    <button type="submit" className="btn btn-light" onClick={makeDeposit} disabled={depositAmount ? false : true}>Deposit</button>
                    </>
                } 
            />
        </div>
    );
}

export default Deposit;

//input is a string, even though the state is initialized to the number 0. It was not obvious with the withdraw because 100 - "90" is 10, but in the deposit 100 + "90" is 10090. Thats is why I am adding Number() to the onChange.
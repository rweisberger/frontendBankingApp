import { useState, useContext } from "react";
import UserContext from "./context";
import AlertComponent from "./alert";
import Card from "./card";

function Deposit(){
    const [depositAmount, setDepositAmount] = useState(0)
    const [open, setOpen] = useState(false);
    const [depositApproval, setDepositApproval] = useState('');
    const ctx = useContext(UserContext);
    let activeUser = ctx.activeUser;
    

function makeDeposit(){
    if(depositAmount > 0) {
        activeUser.balance += depositAmount;
        setDepositApproval(true);
        activeUser.transactionHistory.unshift([Date(), `+ $${depositAmount}`, activeUser.balance]);
        console.log(activeUser.transactionHistory);
    } else {
        setDepositApproval(false)
    };  
    setOpen(true);
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
                    {depositApproval ? 
                        <AlertComponent open={open} message="The deposit was successfully received." type="success" onClose={()=> setOpen(false)} />
                        :
                        <AlertComponent open={open} message="Deposit values cannot be negative." type="error" onClose={()=> setOpen(false)} />
                    }
                    </>
                } 
            />
        </div>
    );
}

export default Deposit;

//input is a string, even though the state is initialized to the number 0. It was not obvious with the withdraw because 100 - "90" is 10, but in the deposit 100 + "90" is 10090. Thats is why I am adding Number() to the onChange.
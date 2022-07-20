import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./context";
import AlertComponent from "./alert";
import Card from "./card";

function Deposit(){
    const navigate = useNavigate();
    const [depositAmount, setDepositAmount] = useState(0)
    const [open, setOpen] = useState(false);
    const [depositApproval, setDepositApproval] = useState('');
    const [balance, setBalance] = useState('');

    const ctx = useContext(UserContext);
    let activeUser = ctx.activeUser;
    
    useEffect(() => {
        if(activeUser === null){
          navigate('/login')
        } else {             
            fetch(`http://localhost:5000/account/find/${ctx.accessEmail}`)
                .then(response => response.json())
                .then(data => {
                    // console.log('data:', data);
                    setBalance(data[0].balance)
            });            
        } 
    });
    
function makeDeposit(){
    if(depositAmount > 0) {
        let newBalance = balance + depositAmount;
        fetch(`http://localhost:5000/account/update/${ctx.accessEmail}/${depositAmount}/${newBalance}`)
        .then(response => response.text())
        .then(text => {
            try {
                console.log(ctx.accessEmail, depositAmount,newBalance)
                // const data = JSON.parse(text);
                // console.log(JSON.stringify(data.value));
                setDepositApproval(true);
                // console.log('JSON:', data);
            } catch(err) {
                setOpen(true)
                console.log('err:', text);
            }
            document.getElementById('deposit').value='';          
        });
    } else {
        setDepositApproval(false)
        document.getElementById('deposit').value=''
    }; 
    setOpen(true);
    setDepositAmount(0);
  }

    return(
        <div className="container">
            <Card 
                bgcolor="info"
                header="Deposit"
                body={
                    <>
                    Account Balance : $  {activeUser ? balance : '--'}<br/><br/>  
                    Deposit Amount<br/> 
                    <input type="number" className="form-control" id="deposit" placeholder="Enter amount" onChange={e => setDepositAmount(Number(e.currentTarget.value),balance)} /><br/>
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

import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import AlertComponent from "../shared/Alert";
import Card from "../shared/Card";

function Withdraw(){
    const navigate = useNavigate();
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const {activeUser, accessEmail} = useContext(UserContext);
    const [open, setOpen] = useState(false);
    const [withdrawApproval, setWithdrawApproval] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [balance, setBalance] = useState('');

    useEffect(() => {
        if(activeUser === null){
            navigate('/login')
        } else {             
            fetch(`/account/find/${accessEmail}`)
                .then(response => response.json())
                .then(data => {
                    // console.log('data:', data);
                    setBalance(data[0].balance)
            });            
        } 
    });

    // onclick update balance in user context
    function makeWithdraw(){
        if(0 < withdrawAmount && withdrawAmount <= balance) {
            let newBalance = balance - withdrawAmount;

            fetch(`/account/update/${accessEmail}/${-withdrawAmount}/${newBalance}`)
            .then(response => response.text())
            .then(text => {
                try {
                    // console.log(ctx.accessEmail, withdrawAmount,newBalance)
                    // const data = JSON.parse(text);
                    // console.log(JSON.stringify(data.value));
                    setWithdrawApproval(true);
                    // console.log('JSON:', data);
                } catch(err) {
                    setOpen(true)
                    console.log('err:', text);
                }
                // document.getElementById('withdraw').value='';          
            });
        } else if(0 > withdrawAmount) {
            setErrorMessage('Enter a positive number.');
            setWithdrawApproval(false);
        } else {
            setErrorMessage('Insufficient funds.');
            setWithdrawApproval(false);
        }
        setOpen(true);
        setWithdrawAmount('');
    }

    return(
        <div className="container">
            <Card 
            bgcolor="info"
            header="Withdraw"
            body={
                <>
                Account Balance : $ {activeUser ? balance : '--'}<br/><br/>  
                Withdraw Amount<br/> 
                <input type="number" className="form-control" value={withdrawAmount} placeholder="Enter amount" onChange={e => setWithdrawAmount(Number(e.currentTarget.value))}/><br/>
                <button type="submit" className="btn btn-light" onClick={makeWithdraw} disabled={withdrawAmount ? false : true}>Withdraw</button>
                {withdrawApproval ? 
                    <AlertComponent open={open} message="The withdraw was processed." type="success" onClose={()=> setOpen(false)} />
                    :
                    <AlertComponent open={open} message={errorMessage} type="error" onClose={()=> setOpen(false)} />
                }
                </>
            } 
            />
        </div>
    );
}

export default Withdraw;

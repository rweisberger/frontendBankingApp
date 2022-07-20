import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./context";

function Transactions() {
    const navigate = useNavigate();
    const [balance, setBalance] = useState('')
    const [userActivityLog, setUserActivityLog] = useState('');
    const ctx = useContext(UserContext);
    let activeUser = ctx.activeUser;
    
    useEffect(() => {
        if(activeUser === null || userActivityLog === null){
          navigate('/login')
        } else {
            // fetch all accounts from API
         fetch(`http://localhost:5000/account/findOne/${ctx.accessEmail}`)
             .then(response => response.json())
             .then(data => {
                 console.log('data:', data);
                 setUserActivityLog(data.transactionHistory);
                 setBalance(data.balance);
             }); 
         }           
     }, []);

    return(
        <div className="container">
            {userActivityLog ? (
                <>
                    <h1>Account Activity
                        <small className="text-muted float-end">{`Available Balance: $${balance}`}</small>
                    </h1>            
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Withdraw/Deposit Amount($)</th>
                            <th scope="col">Balance($)</th>
                        </tr>
                        </thead>
                        <tbody>           
                        {userActivityLog.slice(0).reverse().map((entry, index) => (
                            <tr className={entry.change.includes('-') ? "table-danger" : "table-success"} key={index}>
                            <td>{entry.date}</td>
                            <td >{entry.change}</td>
                            <td>{entry.balance}</td>
                        </tr>
                        ))}
                        </tbody>
                    </table>
                </>) 
                :
                (<h1>Not available </h1>)
            }
        </div>
    );
}

export default Transactions;
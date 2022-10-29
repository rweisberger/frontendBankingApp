import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

function Transactions() {
    const navigate = useNavigate();
    const [balance, setBalance] = useState('')
    const [userActivityLog, setUserActivityLog] = useState('');
    const {activeUser, accessEmail} = useContext(UserContext);
    // let activeUser = ctx.activeUser;
    
    useEffect(() => {
        if(activeUser === null || userActivityLog === null){
          navigate('/login')
        } else {
            // fetch all accounts from API
         fetch(`/account/findOne/${accessEmail}`)
             .then(response => response.json())
             .then(data => {
                //  console.log('data:', data);
                 setUserActivityLog(data.transactionHistory);
                 setBalance(data.balance);
             }); 
         }           
     },[]);

    return(
        <div className="container">
            {userActivityLog ? (
                <>
                    <h1 className="display-5">Account Activity
                    </h1>                         
                    <h5 className="display text-muted">{`Available Balance: $${balance}`}</h5>
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
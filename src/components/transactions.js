import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./context";

function Transactions() {
    const navigate = useNavigate();
    const ctx = useContext(UserContext);
    let activeUser = ctx.activeUser;
    let userActivityLog; 

    if (activeUser) {userActivityLog = ctx.activeUser.transactionHistory};

    useEffect(() => {
        if(activeUser === null || userActivityLog === null){
          navigate('/login')
        }
      }, );
    
    return(
        <div className="container">
            {activeUser ? (
                <>
                    <h1>Account Activity
                        <small className="text-muted float-end">{`Available Balance: $${ctx.activeUser.balance}`}</small>
                    </h1>            
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Withdraw/Deposit Amount</th>
                            <th scope="col">Balance</th>
                        </tr>
                        </thead>
                        <tbody>           
                        {userActivityLog.map((entry, index) => (
                            <tr className={entry.change.includes('+') ? "table-success" : "table-danger"} key={index}>
                            <td>{entry.date}</td>
                            <td>{entry.change}</td>
                            <td>{entry.balance}</td>
                        </tr>
                        ))}
                        </tbody>
                    </table>
                </>) 
                :
                (<h1>Login to view Account Activity </h1>)
            }
        </div>
    );
}

export default Transactions;
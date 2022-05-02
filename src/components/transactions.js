import { useContext } from "react";
import UserContext from "./context";

function Transactions() {
    const ctx = useContext(UserContext);
    let userActivityLog = ctx.activeUser.transactionHistory;

    return(
        <div className="container">
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
        </div>
    );
}

export default Transactions;
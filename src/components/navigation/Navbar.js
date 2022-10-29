import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import UserContext from "../context/UserContext";

function NavBar(){
    const ctx = useContext(UserContext);
    const navigate = useNavigate();

    function handleClick() {
      navigate('/login');
      ctx.setActiveUser(null);
    }
    
    return(
        <div>
            {ctx.activeUser ? (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand px-3" href="#/" data-toggle="tooltip" data-placement="bottom" title="Visit our homepage">The Bank Welcomes {ctx.activeUser}!</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-auto">
                    <a className="nav-item nav-link px-3" href="#/deposit" data-toggle="tooltip" data-placement="bottom" title="Make a deposit">Deposit</a>
                    <a className="nav-item nav-link px-3" href="#/withdraw" data-toggle="tooltip" data-placement="bottom" title="Make a withdraw">Withdraw</a>
                    <a className="nav-item nav-link px-3" href="#/accountActivity" data-toggle="tooltip" data-placement="bottom" title="View recent transactions">Account Activity</a>
                    {ctx.userAdminStatus ? (
                        <a className="nav-item nav-link px-3" href="#/userAccountsData" data-toggle="tooltip" data-placement="bottom" title="View data for all users">UserAccountsData</a>
                        ) : (
                        <></>)}
                    <a className="nav-item nav-link px-3" href="#/delete" data-toggle="tooltip" data-placement="bottom" title="Delete your account">Delete</a>
                    <button type="submit" className="btn btn-outline-info btn-sm" onClick={handleClick}>Logout</button>
                    </div>
                </div>
                </nav>
            ):(
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand px-3" href="#/" data-toggle="tooltip" data-placement="bottom" title="Visit our homepage">The Bank</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-auto">
                    <a className="nav-item nav-link px-3" href="#/CreateAccount" data-toggle="tooltip" data-placement="bottom" title="Create a new account">Create Account</a>
                    <a className="nav-item nav-link px-3" href="#/login" data-toggle="tooltip" data-placement="bottom" title="Access your account">Login</a>
                    </div>
                    </div>
                </nav>
                )
            }
        </div>
    );
}

export default NavBar;
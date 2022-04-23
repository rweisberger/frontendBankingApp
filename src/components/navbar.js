import React,  { useState, useEffect, useContext } from "react";
import { UserContext } from "./context";

function NavBar(){
    const ctx = useContext(UserContext);
    
    return(
        <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand px-3" href="#">BadBank</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
               {/* ctx.activeUser needs time to load? it is not available immediately and throws an error on its own. if ctx and ctx.activeUser are added, there is no error and the navbar loads*/}
                {ctx.activeUser ? (
                    <div className="navbar-nav ml-auto">
                    {/* <a className="nav-item nav-link px-3" href="#/CreateAccount">Create Account</a> */}
                    <a className="nav-item nav-link px-3" href="#/login">Login</a>
                    <a className="nav-item nav-link px-3" href="#/deposit">Deposit</a>
                    <a className="nav-item nav-link px-3" href="#/withdraw">Withdraw</a>
                    <a className="nav-item nav-link px-3" href="#/allData">AllData</a>
                    {/* <a className="nav-item nav-link px-3" href="#/CreateAccount">Create Account</a> */}
                    <button type="submit" className="btn btn-light" onClick={() => ctx.setActiveUser(null)}>Logout</button>
                    </div>
                ):(
                    <div className="navbar-nav ml-auto">
                    <a className="nav-item nav-link px-3" href="#/CreateAccount">Create Account</a>
                    <a className="nav-item nav-link px-3" href="#/login">Login</a>
                    </div>
                )
            }
            </div>
        </nav>
        </div>
    );
}

export default NavBar;
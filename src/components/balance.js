import React, { useContext } from "react";
import { UserContext, Card } from "./context";


function Balance(){
    const ctx = useContext(UserContext);
    let activeUser = ctx.activeUser;

    return(
        <div className="container">
            <Card 
                bgcolor="info"
                header={activeUser ? `Welcome ${activeUser.name}` : 'Login to your account'}
                body={
                    <>
                    Balance {activeUser ? activeUser.balance : '--'}<br/><br/>  
                    </>
                } 
            />
        </div>
    );
}

export default Balance;
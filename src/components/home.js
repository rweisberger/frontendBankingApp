import React from "react";
import { Card } from "./context";
import bank from "./bank.png"

function Home(){

    return(
        <div className="container">
            <Card 
                txtcolor="black"
                bgcolor="info"
                header="BadBank Landing Page"
                title="Welcome to the bank."
                text="We are here for all of your banking needs, but do not provide any security. In fact, we happily share all the users' information!"
                body={(<img src={bank} className="img-fluid" alt="responsive image" />)}
            />
        </div>
    );
}
export default Home;
import React from "react";
import Card from "./card";
import bank from "./bank.png"

function Home(){

    return(
        <div className="container">
            <Card 
                txtcolor="black"
                bgcolor="info"
                header="The Bank Landing Page"
                title="Welcome to our bank."
                text="We are here for all of your banking needs."
                body={(<img src={bank} className="img-fluid" alt="The Bank icon" />)}
            />
        </div>
    );
}
export default Home;
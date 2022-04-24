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
                text="You can use this bank."
                body={(<img src={bank} className="img-fluid" alt="responsive image" />)}
            />
        </div>
    );
}
export default Home;
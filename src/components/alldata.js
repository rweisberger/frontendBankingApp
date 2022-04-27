import React, { useContext } from "react";
import { UserContext } from "./context";

function AllData(){
    const ctx=useContext(UserContext);

    let users = ctx.users
    // users.forEach(user => {
    //     console.log(user.name, user.email, user.password)
    // });


    return(
        <div className="container">
            <h1>All Data</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Password</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                    </tr>
                    ))}
                    </tbody>
                </table>
    </div>
    );
}

export default AllData;
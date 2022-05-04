import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./context";

function AllData(){
    const navigate = useNavigate();
    const ctx = useContext(UserContext);
    let users = ctx.users;
    let activeUser = ctx.activeUser;

    useEffect(() => {
        if(activeUser === null){
          navigate('/login')
        }
      }, ); 

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
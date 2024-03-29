import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

function UserAccountsData(){
    const navigate = useNavigate();
    const {activeUser, userAdminStatus} = useContext(UserContext);
    const [data, setData] = useState('');    

    useEffect(() => {
        if(activeUser === null || userAdminStatus === false){
          navigate('/login')
        } else {
           // fetch all accounts from API
        fetch('/account/all')
            .then(response => response.json())
            .then(data => {
                // console.log('data:', data);
                setData(data);    
            }); 
        }           
    }, []);

    return(
        <div className="container">
            <h1 className="display-5 text-center">All Data</h1>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col" className="text-center">Administrator</th>
                </tr>
                </thead>
                <tbody>
                {data ? (data.map((user, index) => (
                    <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    {user.isAdmin ? (
                        <td className="text-center"><b> + </b></td>
                        ) : (
                        <td className="text-center"> - </td>
                    )}
                </tr>
                ))
                ) : (
                <tr>
                    <td>Loading...</td>
                </tr>)
                }
                </tbody>
            </table>
        </div>
    );
}

export default UserAccountsData;
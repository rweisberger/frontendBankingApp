import React,  { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  HashRouter,
  Routes, 
  Route
} from "react-router-dom";
import UserContext from "./components/context";
import NavBar from "./components/navbar";
import Home from "./components/home";
import CreateAccount from "./components/createaccount";
import Login from "./components/login";
import Deposit from "./components/deposit";
import Withdraw from "./components/withdraw";
import UserAccountsData from "./components/userAccountsData";
import Transactions from "./components/transactions";
import DeleteAccount from "./components/delete";
import './App.css';


function App() {
  let [activeUser, setActiveUser] = useState(null);
  let [accessEmail, setAccessEmail] = useState(null);
  let [userAdminStatus, setUserAdminStatus] = useState(null);
  let context = {activeUser, setActiveUser, accessEmail, setAccessEmail, userAdminStatus, setUserAdminStatus};

  return (
    <HashRouter>
      <UserContext.Provider value={context}> 
        <NavBar/>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/CreateAccount/" element={<CreateAccount />} />
          <Route path="/login/" element={<Login />}/>
          <Route path="/deposit/" element={<Deposit />}/>
          <Route path="/withdraw/" element={<Withdraw />}/>
          <Route path="/accountActivity/" element={<Transactions />} />
          <Route path="/delete/" element={<DeleteAccount />} />
          <Route path="/UserAccountsData/" element={<UserAccountsData />} />
        </Routes>
        </UserContext.Provider>
    </HashRouter>
);
}

export default App;

import React,  { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  HashRouter,
  Routes, 
  Route
} from "react-router-dom";
import UserContext from "./components/context/UserContext";
import NavBar from "./components/navigation/Navbar";
import Home from "./components/pages/Home";
import CreateAccount from "./components/pages/CreateAccount";
import Login from "./components/pages/Login";
import Deposit from "./components/pages/Deposit";
import Withdraw from "./components/pages/Withdraw";
import UserAccountsData from "./components/pages/UserAccountsData";
import Transactions from "./components/pages/Transactions";
import DeleteAccount from "./components/pages/DeleteAccount";
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

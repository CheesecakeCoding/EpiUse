//import ListGroup from "./components/ListGroup";

import { useState } from "react";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import Dashboard from "./components/Dashboard.tsx";
//import CreateCompany from "./components/CreateCompany.tsx";
import CreateEmployee from "./components/CreateEmployee.tsx";
//import ViewHierarchy from "./components/ViewHierarchy.tsx";
//import ViewTable from "./components/ViewTable.tsx";
//import CERoles from "./components/CERoles.tsx";
//import EEmployeeData from "./components/EEmployeeData.tsx";

import { getEmployees } from "./services/CRUDEmployee";
self.$RefreshReg$ = () => {};
self.$RefreshSig$ = () => () => {};
function App() {
  //--- flags used to determine which page to display;
  const [needLogin, setNeedLogin] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [dashboard, setDashboard] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [companyID, setCompany] = useState("");
  const [sha256, setsha256] = useState("");
  const [profilepic, setprofilepic] = useState("");
  const [userDetails, setUserDetails] = useState({
    username: "",
    name: "",
    lastname: "",
    company: "",
    sha256: "",
    profilepic: "/oops/",
  });
  const [tableData, setTableData] = useState({});
  //--- Assigning functions to manipulate the above states across different components
  function handleLogin(val) {
    setNeedLogin(val);
  }
  function handleRegister(val) {
    setRegistering(val);
  }

  function handleDashboard(val) {
    setDashboard(val);
  }

  function handleUserDetails(val) {
    console.log(val);
    setUserDetails(val);
    setUsername(val.username);
    setName(val.name);
    setprofilepic(val.profilepic);
    setLastname(val.lastname);
    setCompany(val.companyID);
    setsha256(val.sha256);
  }
  return (
    <>
      <div className="container LoginContainer" maxwidth="100%">
        {needLogin && !registering && (
          <Login
            handleLogin={handleLogin}
            handleRegister={handleRegister}
            handleDashboard={handleDashboard}
            handleUserDetails={handleUserDetails}
          />
        )}
      </div>
      <div className="container RegisterContainer" maxwidth="100%">
        {registering && <Register handleRegister={handleRegister} />}
      </div>
      <div className="container DashboardContainer">
        {dashboard && (
          <Dashboard
            name={name}
            username={username}
            lastname={lastname}
            companyID={companyID}
            sha256={sha256}
            profilepic={profilepic}
            handleLogin={handleLogin}
          />
        )}
      </div>
    </>
  );
}

export default App;

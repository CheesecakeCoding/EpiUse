//import ListGroup from "./components/ListGroup";

import { useState } from "react";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
//import Dashboard from "./components/Dashboard.tsx";
//import CreateCompany from "./components/CreateCompany.tsx";
import CreateEmployee from "./components/CreateEmployee.tsx";
//import ViewHierarchy from "./components/ViewHierarchy.tsx";
//import ViewTable from "./components/ViewTable.tsx";
//import CERoles from "./components/CERoles.tsx";
//import EEmployeeData from "./components/EEmployeeData.tsx";

self.$RefreshReg$ = () => {};
self.$RefreshSig$ = () => () => {};
function App() {
  //--- flags used to determine which page to display;
  const [needLogin, setNeedLogin] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [dashboard, setDashboard] = useState(false);
  const [createCompany, setcreateCompany] = useState(false);
  const [createEmployee, setcreateEmployee] = useState(true);
  const [viewHierarchy, setviewHierarchy] = useState(false);
  const [viewTable, setviewTable] = useState(false);
  const [CERoles, setCERoles] = useState(false);
  const [EEmployeeData, setEEmployeeData] = useState(false);
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

  function handleCreateCompany(val) {
    setcreateCompany(val);
  }

  function handleCreateEmployee(val) {
    setcreateEmployee(val);
  }

  function handleViewHierarchy(val) {
    setviewHierarchy(val);
  }

  function handleViewTable(val) {
    setviewTable(val);
  }

  function handleRoles(val) {
    setCERoles(val);
  }

  function handleEmployeeData(val) {
    setEEmployeeData(val);
  }

  return (
    <>
      <div className="container LoginContainer">
        {needLogin && !registering && (
          <Login handleLogin={handleLogin} handleRegister={handleRegister} />
        )}
      </div>
      <div className="container RegisterContainer">
        {registering && <Register handleRegister={handleRegister} />}
      </div>
      <div className="container DashboardContainer">
        {dashboard && <Dashboard />}
      </div>
      <div className="container createCompanyContainer">
        {createCompany && <CreateCompany />}
      </div>
      <div className="container createEmployeeContainer">
        {createEmployee && <CreateEmployee />}
      </div>
      <div className="container viewHierarchyContainer">
        {viewHierarchy && <ViewHierarchy />}
      </div>
      <div className="container viewTableContainer">
        {viewTable && <ViewTable />}
      </div>
      <div className="container CERolesContainer">{CERoles && <CERoles />}</div>
      <div className="container EEmployeeDataContainer">
        {EEmployeeData && <EEmployeeData />}
      </div>
    </>
  );
}

export default App;

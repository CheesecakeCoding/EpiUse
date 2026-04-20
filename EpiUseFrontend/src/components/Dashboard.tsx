import TopNavbar from "./TopNavbar";
import EditProfile from "./EditProfile";
import CreateEmployee from "./CreateEmployee";
import ViewTable from "./ViewTable";
import { getEmployees } from "../services/CRUDEmployee";

import ViewHierarchy from "./ViewHierarchy";
import { useState } from "react";
interface DashboardProps {
  name: string;
  username: string;
  lastname: string;
  company: string;
  sha256: string;
  profilepic: string;
  handleLogin: () => void;
}

function Dashboard({
  name = "",
  username = "",
  lastname = "",
  company = "",
  sha256 = "",
  profilepic = "",
  handleLogin,
}: DashboardProps) {
  const [tableView, setTableView] = useState(true);
  const [hierarchyView, sethierarchyView] = useState(false);
  const [createEmployee, setcreateEmployee] = useState(false);
  const [updateInfo, setupdateInfo] = useState(false);
  function handleTableView(val: any) {
    setTableView(val);
    sethierarchyView(!val);
    setcreateEmployee(!val);
    setupdateInfo(!val);
  }
  function handleHierarchyView(val: any) {
    setTableView(!val);
    sethierarchyView(val);
    setcreateEmployee(!val);
    setupdateInfo(!val);
  }
  function handleCreateEmployee(val: any) {
    setTableView(!val);
    sethierarchyView(!val);
    setcreateEmployee(val);
    setupdateInfo(!val);
  }
  function handleUpdateInfo(val: any) {
    setTableView(!val);
    sethierarchyView(!val);
    setcreateEmployee(!val);
    setupdateInfo(val);
  }
  /*var tableData = await getEmployees(username);
  if (tableData.hasOwnProperty("data")) {
    tableData = tableData.data;
  }*/
  return (
    <div className="container page">
      <div className="container nav">
        <TopNavbar
          profilepic={profilepic}
          name={name}
          lastname={lastname}
          handleTableView={handleTableView}
          handleHierarchyView={handleHierarchyView}
          handleUpdateInfo={handleUpdateInfo}
          handleCreateEmployee={handleCreateEmployee}
          handleLogin={handleLogin}
        ></TopNavbar>
        {createEmployee && (
          <CreateEmployee
            username={username}
            companyID={company}
          ></CreateEmployee>
        )}

        {tableView && (
          <ViewTable basedata={[{}]} username={username}></ViewTable>
        )}
        {hierarchyView && <ViewHierarchy username={username}></ViewHierarchy>}

        {false && updateInfo && <EditProfile username={username}></EditProfile>}
      </div>
    </div>
  );
}

export default Dashboard;

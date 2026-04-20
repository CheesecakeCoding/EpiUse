import TopNavbar from "./TopNavbar";
import EditProfile from "./EditProfile";
import { useState } from "react";
interface DashboardProps {
  name: string;
  username: string;
  lastname: string;
  company: string;
  sha256: string;
  profilepic: string;
}

function Dashboard({
  name = "",
  username = "",
  lastname = "",
  company = "",
  sha256 = "",
  profilepic = "",
}: DashboardProps) {
  const [tableView, setTableView] = useState(true);
  const [hierarchyView, sethierarchyView] = useState(false);
  const [createEmployee, setcreateEmployee] = useState(false);
  const [updateInfo, setupdateInfo] = useState(false);
  function handleTableView(val: boolean) {
    setTableView(val);
  }
  function handleSetHierarchyView(val: boolean) {
    sethierarchyView(val);
  }
  function handleSetCreateEmployee(val: boolean) {
    setcreateEmployee(val);
  }
  function handleSetUpdateInfo(val: boolean) {
    setupdateInfo(val);
  }

  return (
    <div className="container page">
      <div className="container nav">
        <TopNavbar
          name={name}
          lastname={lastname}
          setTableView={setTableView}
        ></TopNavbar>
      </div>
    </div>
  );
}

export default Dashboard;

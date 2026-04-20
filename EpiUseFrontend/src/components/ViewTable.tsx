import { getEmployees } from "../services/CRUDEmployee";
import { useState } from "react";
import Button from "./Button";
import EditEmployeeRow from "./EditEmployeeRow";
interface ViewTableProps {
  username: string;
  basedata: any;
  companyID: string;
}
async function populateTable(
  username: string,
  companyID: string,
  setData: any,
) {
  var newData = await getEmployees(username, companyID);
  try {
    newData = newData.data;
    setData(newData);
  } catch {
    console.log(newData);
  }
}

function ViewTable({ username, companyID, basedata }: ViewTableProps) {
  const [data, setData] = useState(basedata);
  const [refresh, setRefresh] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [message, setMessage] = useState("");
  function handleMessage(val) {
    setMessage(val);
  }
  function handleAlerts(val) {
    setShowAlerts(val);
  }
  function handleRefresh(val: boolean) {
    if (val) {
      populateTable(username, companyID, setData);
    }
    setRefresh(false);
  }
  //populateTable(username, setData);
  //

  return (
    <div className="container flex">
      <div>
        <table>
          <thead>
            <tr>
              <th>EmployeeID</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Birthdate</th>
              <th>Salary</th>
              <th>Role</th>
              <th>ManagerID</th>
              <th>Department</th>
              <th>Email</th>
              <th>
                <Button
                  color="outline-secondary"
                  onClick={() => {
                    populateTable(username, companyID, setData);
                  }}
                  block="btn-block"
                  float="float-right"
                  type="button"
                >
                  refresh
                </Button>
              </th>
            </tr>
          </thead>
          <EditEmployeeRow
            handleRefresh={handleRefresh}
            data={data}
            ownerUsername={username}
            handleAlerts={handleAlerts}
            handleMessage={handleMessage}
            showAlerts={showAlerts}
          ></EditEmployeeRow>
        </table>
      </div>
    </div>
  );
}

export default ViewTable;

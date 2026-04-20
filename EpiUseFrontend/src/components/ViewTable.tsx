import { getEmployees } from "../services/CRUDEmployee";
import { useState } from "react";
interface ViewTableProps {
  username: string | any;
}
async function populateTable(username: string, setData: any) {
  var newData = await getEmployees(username);
  setData(newData);
  console.log(newData);
}

function ViewTable({ username }: ViewTableProps) {
  const [tableData, setData] = useState([]);
  function handleData(val: any) {
    setData(val);
  }
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
                <button onClick={() => populateTable(username, handleData)}>
                  Refresh
                </button>
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewTable;

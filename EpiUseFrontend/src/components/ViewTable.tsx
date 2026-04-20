import { getEmployees } from "../services/CRUDEmployee";
import { useState } from "react";
interface ViewTableProps {
  username: string;
  basedata: any;
}
async function populateTable(username: string, setData: any) {
  var newData = await getEmployees(username);
  setData(newData);
  console.log(newData);
}

function ViewTable({ username, basedata }: ViewTableProps) {
  const [data, setData] = useState(basedata);
  //populateTable(username, setData);
  //
  console.log(data);
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
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewTable;

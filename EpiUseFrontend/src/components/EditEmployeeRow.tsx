import { getEmployees } from "../services/CRUDEmployee";
import { useState } from "react";

function EditEmployeeRow() {
  //populateTable(username, setData);
  //
  return (
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
  );
}

export default EditEmployeeRow;

import { updateEmployees, deleteEmployees } from "../services/CRUDEmployee";
import { useState } from "react";
import Button from "./Button";

interface EditEmployeeRowProps {
  data: any;
  ownerUsername: string;
  handleRefresh: (val: boolean) => void;
}

function EditEmployeeRow({
  data,
  ownerUsername,
  handleRefresh,
}: EditEmployeeRowProps) {
  async function deleteEmployee(employeeID, email) {
    var formdata = new FormData();
    formdata.append("employeeID", `${employeeID}`);
    formdata.append("username", `${email}`);
    var res = await deleteEmployees(formdata);
    console.log(res);
    if (res.deleted) {
      setShowAlerts(false);
      setMessage("");
      handelLocalRefresh(true);
    } else {
      setMessage(`${res.message}`);
      setShowAlerts(true);
    }
  }

  async function updateEmployeeRow(
    username: string,
    name: string,
    surname: string,
    salary: number,
    role: string,
    manager: string,
    department: string,
    email: string,
    employeeID: string,
  ) {
    var formdata = new FormData();
    formdata.append("username", `${email}`);
    formdata.append("firstname", `${name}`);
    formdata.append("surname", `${surname}`);
    formdata.append("salary", `${salary}`);
    formdata.append("role", `${role}`);
    formdata.append("managerID", `${manager}`);
    formdata.append("department", `${department}`);
    formdata.append("companyID", `${username}`);
    formdata.append("employeeID", `${employeeID}`);

    var result = await updateEmployees(formdata);
    if (result.updated && result.managered) {
      setShowAlerts(false);
      setMessage("");
      setLocalRefresh(true);
    } else {
      setMessage(`${result.message} \n ${result.managerMsg}`);
      setShowAlerts(true);
    }
  }

  //{showAlerts & <tr><td colSpan={9}>ff</td></tr>}
  //populateTable(username, setData);
  //
  //console.log(data);
  const [editEmployee, setEmployee] = useState("");
  const [showAlerts, setShowAlerts] = useState(false);
  const [message, setMessage] = useState("");
  const [localRefresh, setLocalRefresh] = useState(false);
  function handelLocalRefresh(val) {
    setLocalRefresh(val);
    handleRefresh(true);
  }
  const DisplayData = data.map((info: any) => {
    return (
      <>
        {showAlerts ? (
          <>
            <tr>
              <td></td>
            </tr>
            <tr>
              <td colSpan={8}> Info on transaction:</td>
            </tr>
            <tr>
              <td colSpan={8}>Reason: {message}</td>
            </tr>
            <tr>
              <td></td>
            </tr>
          </>
        ) : (
          ""
        )}
        <tr>
          <td>{info.employeeID}</td>

          <td>
            {info.employeeID == editEmployee ? (
              <input
                id={`${info.employeeID}name`}
                defaultValue={info.name}
              ></input>
            ) : (
              info.name
            )}
          </td>
          <td>
            {info.employeeID == editEmployee ? (
              <input
                id={`${info.employeeID}surname`}
                defaultValue={info.surname}
              ></input>
            ) : (
              info.surname
            )}
          </td>
          <td>{info.birthdate}</td>
          <td>
            {info.employeeID == editEmployee ? (
              <input
                id={`${info.employeeID}salary`}
                defaultValue={info.salary}
                type="number"
              ></input>
            ) : (
              info.salary
            )}
          </td>
          <td>
            {info.employeeID == editEmployee ? (
              <input
                id={`${info.employeeID}role`}
                defaultValue={info.role}
              ></input>
            ) : (
              info.role
            )}
          </td>
          <td>
            {info.employeeID == editEmployee ? (
              <input
                id={`${info.employeeID}managerID`}
                defaultValue={info.managerID}
              ></input>
            ) : (
              info.managerID
            )}
          </td>
          <td>
            {info.employeeID == editEmployee ? (
              <input
                id={`${info.employeeID}department`}
                defaultValue={info.department}
              ></input>
            ) : (
              info.department
            )}
          </td>
          <td>{info.email}</td>

          {info.employeeID == editEmployee ? (
            <td>
              <Button
                onClick={() => {
                  setEmployee("");
                  updateEmployeeRow(
                    ownerUsername,
                    document.getElementById(`${info.employeeID}name`).value,
                    document.getElementById(`${info.employeeID}surname`).value,

                    document.getElementById(`${info.employeeID}salary`).value,
                    document.getElementById(`${info.employeeID}role`).value,
                    document.getElementById(`${info.employeeID}managerID`)
                      .value,
                    document.getElementById(`${info.employeeID}department`)
                      .value,
                    info.email,
                    info.employeeID,
                  );
                }}
                block="btn-block"
                float="float-left"
                type="button"
              >
                Submit
              </Button>
            </td>
          ) : (
            <td>
              <Button
                onClick={() => {
                  setEmployee(info.employeeID);
                }}
                size="btn-sm"
                block="btn-block"
                float="float-left"
                color="outline-secondary"
                type="button"
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  deleteEmployee(info.employeeID, info.email);
                }}
                size="btn-sm"
                block="btn-block"
                float="float-left"
                color="danger"
                type="button"
              >
                Delete
              </Button>
            </td>
          )}
        </tr>
      </>
    );
  });

  return <tbody>{DisplayData}</tbody>;
}

export default EditEmployeeRow;

import LabledTextBox from "./LabeledTextBox.tsx";
import LabledTextBoxProps from "./LabeledTextBox.tsx";
import Button from "./Button";
import { createEmployee, getEmployees } from "../services/CRUDEmployee";

interface CreateEmployeeProps {
  username: string;
  companyID: string;
  editEmployee: any;
  handleEdit: (val: any) => void;
  toEdit: boolean;
}

function CreateEmployee({
  username,
  companyID,
  handleEdit,
  toEdit = false,
}: CreateEmployeeProps) {
  async function handleCreateEmployee(
    name: string,
    surname: string,
    email: string,
    birthdate: Date,
    salary: number,
    role: string,
    department: string,
    username: string,
  ) {
    var formdata = new FormData();
    formdata.append("username", `${email}`);
    formdata.append("firstname", `${name}`);
    formdata.append("surname", `${surname}`);
    formdata.append("birthdate", `${birthdate}`);
    formdata.append("salary", `${salary}`);
    formdata.append("role", `${role}`);
    formdata.append("managerID", "null");
    formdata.append("department", `${department}`);
    formdata.append("companyID", `${username}`);
    var result = await createEmployee(formdata);
    try {
      if (result.created) {
        var newData = await getEmployees(username, companyID);
        try {
          newData = newData.data;
          handleEdit("");
        } catch {
          console.log(newData);
        }
      }
    } catch {
      console.log(result);
    }
  }
  return (
    <div className="container">
      <div className="row vh-100 align-items-center justify-content-center">
        <div className="col-sm-8 col-md-6 col-lg-4 bgwhite- rounded p-3 shadow">
          <div className="row justify-content-center mb-4">
            <div className="row justify-content-center">
              <h1>Create A New Employee</h1>
            </div>
            <br />
            <div></div>
            <br />

            <div className="CreateEmployeeInputs">
              <LabledTextBox
                type="text"
                placeholder="First Name"
                id="CreateEmployeeName"
              >
                First Name
              </LabledTextBox>
              <LabledTextBox
                type="text"
                placeholder="Last Name"
                id="CreateEmployeeLastame"
              >
                Last Name
              </LabledTextBox>
              <LabledTextBox
                type="text"
                placeholder="Employee Email"
                id="CreateEmployeeEmail"
              >
                Email
              </LabledTextBox>
              <LabledTextBox
                type="date"
                placeholder="Birthdate"
                id="CreateEmployeeBirthdate"
              >
                Birthdate
              </LabledTextBox>
              <LabledTextBox
                type="number"
                placeholder="0"
                id="CreateEmployeeSalary"
              >
                Salary
              </LabledTextBox>
              <LabledTextBox
                type="text"
                placeholder="employee"
                id="CreateEmployeeRole"
              >
                Role
              </LabledTextBox>
              <LabledTextBox
                type="text"
                placeholder="Department"
                id="CreateEmployeeDepartment"
              >
                Department
              </LabledTextBox>
              <br />
              <div className="d-flex flex-row-reverse p-3 float-right">
                <Button
                  onClick={() => {
                    handleCreateEmployee(
                      document.getElementById("CreateEmployeeName").value,
                      document.getElementById("CreateEmployeeLastame").value,
                      document.getElementById("CreateEmployeeEmail").value,
                      document.getElementById("CreateEmployeeBirthdate").value,
                      document.getElementById("CreateEmployeeSalary").value,
                      document.getElementById("CreateEmployeeRole").value,
                      document.getElementById("CreateEmployeeDepartment").value,
                      username,
                    );
                  }}
                  block="btn-block"
                  float="float-right"
                  type="button"
                >
                  Create
                </Button>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}

export default CreateEmployee;

import LabledTextBox from "./LabeledTextBox.tsx";
import LabledTextBoxProps from "./LabeledTextBox.tsx";

function CreateEmployee() {
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
                id="CreateEmployeeName"
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
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}

export default CreateEmployee;

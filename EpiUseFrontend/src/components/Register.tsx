import LabledTextBoxProps from "./LabeledTextBox.tsx";
import Button from "./Button";
import { register } from "../services/register";

interface RegisterProps {
  handleRegister: () => void;
}

function Register({ handleRegister }: RegisterProps) {
  async function createUser(
    username: string | null,
    password: string | null,
    firstname: string,
    lastname: string,
    handleRegister: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    if (username == null || password == null) {
      return;
    }
    var formdata = new FormData();
    formdata.append("RegisterUsername", `${username}`);
    formdata.append("RegisterPassword", `${password}`);
    formdata.append("RegisterName", `${firstname}`);
    formdata.append("RegisterSurname", `${lastname}`);
    var result = await register(formdata);
    if (!result.hasOwnProperty("registered")) {
      //xxx could do alerts later setAlertVisible(true);
      return;
    }
    if (!result.registered) {
      handleRegister(false);
    }
    //xxx  Registering was not successful
    handleRegister(true);
    console.log(`Result: ${JSON.stringify(result)}`);
    return result;
  }

  return (
    <div className="container">
      <div className="row vh-100 align-items-center justify-content-center">
        <div className="col-sm-8 col-md-6 col-lg-4 bgwhite- rounded p-3 shadow">
          <div className="row justify-content-center mb-4">
            <div className="row justify-content-center">
              <h1>Register Account</h1>
            </div>
            <br />
            <div></div>
            <br />
            <LabledTextBoxProps id="RegisterName"> Name </LabledTextBoxProps>
            <LabledTextBoxProps id="RegisterSurname">
              {" "}
              Surname{" "}
            </LabledTextBoxProps>
            <LabledTextBoxProps id="RegisterUsername">
              {" "}
              Email{" "}
            </LabledTextBoxProps>
            <LabledTextBoxProps id="RegisterPassword">
              {" "}
              Password{" "}
            </LabledTextBoxProps>
            <LabledTextBoxProps id="RegisterConfirmPass">
              {" "}
              Confirm Password{" "}
            </LabledTextBoxProps>
          </div>
          <br />

          <div>
            <div className="d-flex flex-row-reverse p-3 float-right">
              <Button
                onClick={() => {
                  createUser(
                    document.getElementById("RegisterUsername").value,
                    document.getElementById("RegisterPassword").value,
                    document.getElementById("RegisterName").value,
                    document.getElementById("RegisterSurname").value,
                    handleRegister,
                  );
                }}
                block="btn-block"
                float="float-right"
                type="button"
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

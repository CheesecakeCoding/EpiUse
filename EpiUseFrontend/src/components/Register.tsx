import LabledTextBox from "./LabeledTextBox.tsx";
import Button from "./Button";
import { register } from "../services/register";
import React, { useState } from "react";
interface RegisterProps {
  handleRegister: (val: boolean) => void;
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
    if (!result.registered) {
      setAlertVisible(true);
      setMessage(result.message);
      handleRegister(true);
      return;
    }

    //xxx  Registering was successful
    handleRegister(false);
    setAlertVisible(false);
    setMessage(result.message);
    console.log(`Result: ${JSON.stringify(result)}`);
    return result;
  }
  const [alertVisible, setAlertVisible] = useState(false);
  const [message, setMessage] = useState("");
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
            <LabledTextBox id="RegisterName"> Name </LabledTextBox>
            <LabledTextBox id="RegisterSurname"> Surname </LabledTextBox>
            <LabledTextBox id="RegisterUsername"> Email </LabledTextBox>
            <LabledTextBox id="RegisterPassword"> Password </LabledTextBox>
            <LabledTextBox id="RegisterConfirmPass">
              Confirm Password
            </LabledTextBox>
          </div>
          <br />
          {alertVisible && <div>{message}</div>}
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
              <Button
                onClick={() => {
                  handleRegister(false);
                }}
                block="btn-block"
                float="float-right"
                type="button"
                color="outline-secondary"
              >
                Back To Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

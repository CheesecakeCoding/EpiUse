import React, { useState } from "react";
import FailedAlert from "./FailedAlert";
import Button from "./Button";
import { login } from "../services/login";
import { getGravatar } from "../adapters/gravatar";

interface LoginProps {
  handleLogin: () => void;
  handleRegister: () => void;
  handleDashboard: () => void;
  handleUserDetails: () => void;
}

function Login({
  handleLogin,
  handleRegister,
  handleDashboard,
  handleUserDetails,
}: LoginProps) {
  async function sendLogin(
    username: string | null,
    password: string | null,
    handleLogin: React.Dispatch<React.SetStateAction<boolean>>,
    setAlertVisible: React.Dispatch<React.SetStateAction<boolean>>,
    handleDashboard: React.Dispatch<React.SetStateAction<boolean>>,
    handleUserDetails: any,
  ) {
    if (username == null || password == null) {
      return;
    }
    var formdata = new FormData();
    formdata.append("LoginUsername", `${username}`);
    formdata.append("LoginPassword", `${password}`);
    var result = await login(formdata);
    console.log(`Register Res ${result}`);
    if (!result.hasOwnProperty("login")) {
      setAlertVisible(true);
      handleLogin(true);
      return;
    }
    handleLogin(!result.login);

    console.log(`Result: ${JSON.stringify(result)}`);
    var gravatar = await getGravatar(result.sha);
    console.log(`gravatar ${gravatar}`);
    handleDashboard(result.login);

    var userInfo = {
      username: `${result.data.username}`,
      name: `${result.data.firstname}`,
      lastname: `${result.data.surname}`,
      company: `${result.data.company}`,
      sha256: `${result.sha}`,
      profilepic: gravatar,
    };
    handleUserDetails(userInfo);
    return result;
  }

  function reg(handleRegister: React.Dispatch<React.SetStateAction<boolean>>) {
    handleRegister(true);
  }

  const [alertVisible, setAlertVisible] = useState(false);
  return (
    <div className="container">
      <div className="row vh-100 align-items-center justify-content-center">
        <div className="col-sm-8 col-md-6 col-lg-4 bgwhite- rounded p-3 shadow">
          <div className="row justify-content-center mb-4">
            <div className="row justify-content-center">
              <h1>Please Enter Your Credentials</h1>
            </div>
            <br />
            <br />
            <div className="row">
              <div className="col">
                <label htmlFor="LoginUsername" className="form-label">
                  Username:
                </label>
              </div>

              <div className="col">
                <input
                  type="text"
                  placeholder="Enter Username"
                  id="LoginUsername"
                  name="LoginUsername"
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="LoginPassword" className="form-label">
                  Password:
                </label>
              </div>
              <div className="col">
                <input
                  type="password"
                  placeholder="Enter Password"
                  id="LoginPassword"
                  name="LoginPassword"
                  className="form-control"
                  required
                />
              </div>
            </div>
            <br />
            {alertVisible === true && <FailedAlert></FailedAlert>}
            <div>
              <div className="d-flex flex-row p-3 float-right">
                <Button
                  onClick={() => {
                    reg(handleRegister);
                  }}
                  color="outline-secondary"
                  block="btn-block"
                  float="float-right"
                  type="button"
                >
                  Register
                </Button>
                <Button
                  onClick={() => {
                    sendLogin(
                      document.getElementById("LoginUsername").value,
                      document.getElementById("LoginPassword").value,
                      handleLogin,
                      setAlertVisible,
                      handleDashboard,
                      handleUserDetails,
                    );
                  }}
                  block="btn-block"
                  float="float-right"
                  type="submit"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

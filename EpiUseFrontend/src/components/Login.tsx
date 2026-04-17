import React, { useState } from "react";
import FailedAlert from "./FailedAlert";
import Button from "./Button";
import { login } from "../services/login";

interface LoginProps {
  handleLogin: () => void;
  demoAlert: () => void;
}

function Login({ handleLogin, demoAlert }: LoginProps) {
  const [alertVisible, setAlertVisible] = useState(false);
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  return (
    <div className="container">
      <div className="row vh-100 align-items-center justify-content-center">
        <div className="col-sm-8 col-md-6 col-lg-4 bgwhite- rounded p-3 shadow">
          <div className="row justify-content-center mb-4">
            <form id="login_screen" action={login}>
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
                    defaultValue={name}
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
                    defaultValue={pass}
                  />
                </div>
              </div>
              <br />
              {alertVisible === true && <FailedAlert></FailedAlert>}
              <div className="d-flex flex-row-reverse p-3 float-right">
                <Button
                  onClick={function () {}}
                  block="btn-block"
                  float="float-right"
                  type="submit"
                >
                  Sign In
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

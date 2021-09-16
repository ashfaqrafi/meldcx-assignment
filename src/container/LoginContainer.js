import React, { useState } from "react";
import { MdEmail, MdInfo } from "react-icons/md";
import axios from "axios";
import { Redirect } from "react-router";

const errorMessage = (
  <div>
    <br />
    <p style={{ color: "red" }}>Wrong Password, Please try again!</p>
  </div>
);

export default function LoginContainer({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const getAccessToken = localStorage.getItem("meldCX_access_token");
  const url = "http://35.201.2.209:8000";

  const getEmail = (e) => setEmail(e.target.value);
  const getPassword = (e) => setPassword(e.target.value);
  const logIn = () => {
    axios
      .post(`${url}/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        const token = res.data;
        localStorage.setItem("meldCX_access_token", token);
        history.push("/devices");
      })
      .catch(() => {
        setError(true);
      });
  };

  if (getAccessToken === null) {
    return (
      <div className="login-wrapper">
        <h1 className="login-header">Login</h1>
        <div className="login">
          <div className="login-inputs">
            <div style={{ position: "relative" }}>
              <MdEmail size={20} />
            </div>
            <input
              type="email"
              onChange={getEmail}
              placeholder="Email Address"
              id="email"
            />
          </div>
          <div className="login-inputs">
            <div style={{ position: "relative" }}>
              <MdInfo size={20} />
            </div>
            <input
              type="password"
              onChange={getPassword}
              placeholder="Password"
              id="password"
            />
          </div>
          <button onClick={logIn} className="login-button">
            LOG IN
          </button>
        </div>

        {error && errorMessage}
      </div>
    );
  }

  return <Redirect from="/" to="/devices" />;
}

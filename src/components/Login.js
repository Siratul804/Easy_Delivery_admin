import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import "./com.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dash from "./Dashboard/Dash";

import { API_URL } from "../constants";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { userData, setUserData } = useContext(UserContext);

  const [error, setError] = useState();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const url = `${API_URL}/api/admin/SignIn`;
      const loginRes = await Axios.post(url, loginUser);
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      window.location.href = "/";
      localStorage.setItem("auth-token", loginRes.data.token);
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <>
      {userData.user ? (
        <>
          <section className="dash">
            <Dash />
          </section>
        </>
      ) : (
        <>
          <div className="login text-white ">
            <section className="login_section">
              <Form onSubmit={submit}>
                <h3 className="py-2" style={{ fontWeight: "bold" }}>
                  Log In
                </h3>
                {error && (
                  <ErrorNotice
                    message={error}
                    clearError={() => setError(undefined)}
                  />
                )}
                <Form.Group className="mb-4  " controlId="formBasicEmail">
                  <Form.Control
                    className="logInInput"
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-4  " controlId="formBasicPassword">
                  <Form.Control
                    className="logInInput"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Check
                    type="checkbox"
                    label="Remember me"
                    className="py-2"
                  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button className="logBtn" type="submit">
                    Log In
                  </Button>
                </div>
              </Form>
            </section>
          </div>
        </>
      )}
    </>
  );
}

export default Login;

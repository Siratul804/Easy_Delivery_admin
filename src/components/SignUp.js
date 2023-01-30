import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import "./com.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

import { API_URL } from "../constants";

function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const { user, setUserData } = useContext(UserContext);

  const [error, setError] = useState();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { name, email, password, passwordCheck, displayName };
      const url_S = `${API_URL}/api/admin/SignUp`;
      await Axios.post(url_S, newUser);
      const url_L = `${API_URL}/api/admin/SignIn`;
      const loginRes = await Axios.post(url_L, {
        email,
        password,
      });
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
    <div className="SignUp text-white ">
      <section className="SignUp_section">
        <Form onSubmit={submit}>
          <h3 className="py-2" style={{ fontWeight: "bold" }}>
            Sign Up
          </h3>
          {error && (
            <ErrorNotice
              message={error}
              clearError={() => setError(undefined)}
            />
          )}
          <div className=" signUp_input_div  ">
            <Form.Group className="mb-4  " controlId="formBasicText">
              <Form.Control
                className="logInInput"
                type="text"
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Control
                className="logInInput"
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </div>

          <div className=" signUp_input_div ">
            <Form.Group className="mb-4 px-1 " controlId="formBasicPassword">
              <Form.Control
                className="logInInput"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-4 px-1 " controlId="formBasicPassword">
              <Form.Control
                className="logInInput"
                type="password"
                placeholder="Password Check  "
                onChange={(e) => setPasswordCheck(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className=" signUp_input_div ">
            <Form.Group className="mb-4 px-1 " controlId="formBasicText">
              <Form.Control
                className="logInInput"
                type="text"
                placeholder="Display Name  "
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </Form.Group>
          </div>

          <div className="d-grid gap-2">
            <Button className="logBtn" type="submit">
              Sign Up
            </Button>
          </div>
        </Form>
      </section>
    </div>
  );
}

export default SignUp;

import React, { useContext } from "react";

import UserContext from "../context/UserContext";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

import "./layout.css";

function Header() {
  const { userData, setUserData } = useContext(UserContext);

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <div>
      {userData.user ? (
        <>
          <Navbar
            collapseOnSelect
            expand="lg"
            variant="dark"
            className="NavBar"
          >
            <Container>
              <Navbar.Brand>
                <div className="nav_item">
                  <NavLink to="/" className="nav_link_logo">
                    Easy Devliery
                  </NavLink>
                </div>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto"></Nav>
                <Nav>
                  <Button
                    variant="outline-danger"
                    style={{ fontWeight: "bold" }}
                    onClick={logout}
                  >
                    Log Out
                  </Button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
      ) : (
        <>
          <Navbar
            collapseOnSelect
            expand="lg"
            variant="dark"
            className="NavBar"
          >
            <Container>
              <Navbar.Brand>
                <div className="nav_item">
                  <NavLink to="/" className="nav_link_logo">
                    Easy Devliery
                  </NavLink>
                </div>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto"></Nav>
                <Nav>
                  <div className="nav_item">
                    <NavLink
                      to="/login"
                      className="nav_link"
                      activeClassName="nav_link_active"
                    >
                      Login
                    </NavLink>
                  </div>
                  <div className="nav_item">
                    <NavLink
                      to="/signUp"
                      className="nav_link"
                      activeClassName="nav_link_active"
                    >
                      Sign Up
                    </NavLink>
                  </div>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
      )}
    </div>
  );
}

export default Header;

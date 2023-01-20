import React, { useContext, useEffect, useState } from "react";
import "./dash.css";

import { NavLink } from "react-router-dom";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import Button from "react-bootstrap/Button";

import { BiEdit } from "react-icons/bi";
import { AiOutlineCodepen } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { IoIosCreate } from "react-icons/io";
import { IoMdCreate } from "react-icons/io";

import UserContext from "../../context/UserContext";

import Axios from "axios";

function GlobalDash() {
  const { setUserData } = useContext(UserContext);

  const [res, setRes] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/get/oder")
      .then((res) => {
        setRes(res.data);
        console.log(res.data);
        console.log(res.data.length);
      })
      .catch(() => {
        console.log("ERR");
      });
  }, []);

  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };
  return (
    <>
      <NavLink to="/" className="text-light p-3 dash_h3 ">
        <h3 style={{ fontWeight: "bold" }}>
          <MdOutlineDashboardCustomize /> Dashboard
        </h3>
      </NavLink>
      <NavLink
        to="/create"
        className="dash_link p-2 "
        activeClassName="dash_link_active"
      >
        <h5>
          <AiOutlinePlus /> Create Food
        </h5>
      </NavLink>
      <p></p>
      <NavLink
        to="/edit"
        className="dash_link p-2 "
        activeClassName="dash_link_active"
      >
        <h5>
          <BiEdit /> Edit Food
        </h5>
      </NavLink>
      <p></p>
      <NavLink
        to="/oder"
        className="dash_link p-2 "
        activeClassName="dash_link_active"
      >
        <h5>
          <AiOutlineCodepen /> Oders{" "}
          <span
            style={{
              backgroundColor: "red",
              padding: "5px",
              borderRadius: "20px",
            }}
          >
            {res.length}
          </span>
        </h5>
      </NavLink>
      <p></p>
      <NavLink
        to="/reviews"
        className="dash_link p-2 "
        activeClassName="dash_link_active"
      >
        <h5>
          <IoIosCreate /> Create Reviews
        </h5>
      </NavLink>
      <p></p>
      <NavLink
        to="/reviewsEdit"
        className="dash_link p-2 "
        activeClassName="dash_link_active"
      >
        <h5>
          <IoMdCreate /> Edit Reviews
        </h5>
      </NavLink>

      <div className="logout_btn">
        <Button
          variant="outline-danger"
          style={{ fontWeight: "bold" }}
          onClick={logout}
        >
          <CiLogout /> Log Out
        </Button>
      </div>
    </>
  );
}

export default GlobalDash;

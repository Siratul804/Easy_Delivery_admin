import React, { useContext } from "react";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import "../dash.css";

import axios from "axios";

import { Scrollbars } from "react-custom-scrollbars-2";
import { ServerContext } from "../../../contex/ServerContext";

import GlobalDash from "../GlobalDash";

import { API_URL } from "../../../constants";

function Edit() {
  const { get } = useContext(ServerContext);
  const [getValue] = get;

  const deleteFood = (id) => {
    const url = `${API_URL}/api/delete/${id}`;

    axios.delete(url);
    window.location.reload();
  };

  function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div className="edit">
      <section className="dash_box">
        <div className="Dashboard container">
          <GlobalDash />
        </div>
        <div className="Dashboard_content_edit">
          <Scrollbars>
            <section className="dash_Box_edit">
              <div className="food_edit_head">
                <p>Name</p>
                <p style={{ paddingLeft: "55px" }}>Price</p>
                <p style={{ paddingLeft: "5px" }}>Description</p>
                <p>Action</p>
                <p>Action</p>
              </div>
              {getValue.map((food) => {
                return (
                  <>
                    <div className="food_edit pt-4 ">
                      <p>{truncate(`${food.name}`, 10)}</p>
                      <p>$ {food.price}</p>
                      <p>{truncate(`${food.description}`, 10)}</p>
                      <Link
                        to={`/edit/details/${food._id}`}
                        className="edit_btn_edit"
                      >
                        <div className="d-flex justify-content-between">
                          Edit
                          <div style={{ paddingLeft: "2px" }}>
                            <TbEdit />
                          </div>
                        </div>
                      </Link>
                      <button
                        className="edit_btn_dlt"
                        onClick={() => {
                          deleteFood(food._id);
                        }}
                      >
                        <div className="d-flex justify-content-center">
                          Delete
                          <div style={{ paddingLeft: "2px" }}>
                            <MdDelete />
                          </div>
                        </div>
                      </button>
                    </div>
                  </>
                );
              })}
            </section>
          </Scrollbars>
        </div>
      </section>
    </div>
  );
}

export default Edit;

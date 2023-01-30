import React, { useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import "../dash.css";

import axios from "axios";

import { API_URL } from "../../../constants";

import { Scrollbars } from "react-custom-scrollbars-2";

import GlobalDash from "../GlobalDash";

function EditReview() {
  const [get, setGet] = useState([]);

  useEffect(() => {
    const url = `${API_URL}/api/get/review`;

    axios.get(url).then((res) => {
      console.log(res.data);
      setGet(res.data);
    });
  }, []);

  function truncate(str, n) {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const deleteReview = (id) => {
    const url = `${API_URL}/api/delete/review/${id}`;

    axios.delete(url);
    window.location.reload();
  };

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
                <p>Title</p>
                <p style={{ paddingLeft: "55px" }}>Description</p>
                <p>Action</p>
                <p>Action</p>
              </div>
              {get.map((review) => {
                return (
                  <>
                    <div className="food_edit pt-4 ">
                      <p>{truncate(`${review.title}`, 10)}</p>
                      <p>{truncate(`${review.description}`, 10)}</p>
                      <Link
                        to={`/reviews/edit/details/${review._id}`}
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
                          deleteReview(review._id);
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

export default EditReview;

import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Table, Button } from "react-bootstrap";
import "../dash.css";
import GlobalDash from "../GlobalDash";

import { API_URL } from "../../../constants";

import { Scrollbars } from "react-custom-scrollbars-2";

function Oder() {
  const [res, setRes] = useState([]);

  useEffect(() => {
    const url = `${API_URL}/api/get/oder`;

    Axios.get(url)
      .then((res) => {
        setRes([...res.data]);
      })
      .catch(() => {
        console.log("ERR");
      });
  }, []);

  const DeleteOder = (id) => {
    const url = `${API_URL}/api/delete/oder/${id}`;

    Axios.delete(url).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="oder text-white">
      <section className="dash_box">
        <div className="Dashboard container">
          <GlobalDash />
        </div>
        <div className="Dashboard_content">
          <Scrollbars>
            {/* socket */}

            <div className="container">
              {res.map((res) => {
                return (
                  <>
                    <div
                      style={{
                        padding: "15px",
                        marginTop: "15px",
                      }}
                    >
                      <i
                        className="text-warning"
                        style={{ fontFamily: "sans-serif" }}
                      >
                        <b>Oder Info :</b>
                      </i>
                      <Table striped bordered hover>
                        <thead className="text-light">
                          <tr>
                            <th> Name</th>
                            <th>Quanity</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Table</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="text-light">
                              {res.Name.join(" , ")}
                            </td>
                            <td className="text-light">
                              {res.Quanity.join(" , ")}
                            </td>
                            <td className="text-light">
                              ${res.Price.join(" , ")} BDT{" "}
                            </td>
                            <td className="text-light">$ {res.Total} BDT </td>
                            <td className="text-light">No.{res.Table} </td>
                          </tr>
                        </tbody>
                      </Table>

                      <Button
                        variant="outline-danger"
                        onClick={() => {
                          DeleteOder(res._id);
                        }}
                      >
                        Delete
                      </Button>
                      <br />
                    </div>
                  </>
                );
              })}
            </div>
          </Scrollbars>
        </div>
      </section>
    </div>
  );
}

export default Oder;

import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Table, Button } from "react-bootstrap";
import "../dash.css";
import GlobalDash from "../GlobalDash";

import { Scrollbars } from "react-custom-scrollbars-2";

function Oder() {
  const [res, setRes] = useState([]);

  // const [isLoading, setLoading] = useState([]);

  // const fetchOders = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await Axios.get("http://localhost:8000/api/get/oder");
  //     const oders = response.data;

  //     if (oders) setRes(oders);
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   fetchOders();
  // }, []);

  // if (isLoading) return <div>Loading....</div>;
  useEffect(() => {
    Axios.get("http://localhost:8000/api/get/oder")
      .then((res) => {
        setRes([...res.data]);
      })
      .catch(() => {
        console.log("ERR");
      });
  }, []);

  const DeleteOder = (id) => {
    Axios.delete(`http://localhost:8000/api/delete/oder/${id}`).then(() => {
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

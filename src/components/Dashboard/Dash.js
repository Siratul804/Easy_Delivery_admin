import React, { useState } from "react";
import Axios from "axios";
import { Form, Button } from "react-bootstrap";
import "./dash.css";
import GlobalDash from "./GlobalDash";

import { API_URL } from "../../constants";

function Dash() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState("");
  const [image, setImage] = useState([]);

  const onChnageFile = (e) => {
    setImage(e.target.files[0]);
  };

  const Submit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("categories", categories);
    formData.append("price", price);

    const url = `${API_URL}/api/admin/post`;

    Axios.post(url, formData).then((done, err) => {
      if (done) {
        window.location.reload();
        alert("Success");
      } else {
        alert("failed");
        console.log(err);
      }
    });
  };
  return (
    <div className="create ">
      <section className="dash_box">
        <div className="Dashboard container">
          <GlobalDash />
        </div>
        <div className="Dashboard_content container ">
          <section className="dashboard_box">
            <Form encType="multipart/form-data" method="post">
              <Form.Group
                className="mb-3 text-white "
                style={{ fontWeight: "bold" }}
                controlId="formBasicText"
              >
                <Form.Label>Name : </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Food Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3  text-white  "
                style={{ fontWeight: "bold" }}
                controlId="formBasicText"
              >
                <Form.Label>Price : </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Food Price"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3  text-white  "
                controlId="exampleForm.ControlTextarea1"
                style={{ fontWeight: "bold" }}
              >
                <Form.Label>Description :</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  type="text"
                  placeholder="Enter Food Description"
                />
              </Form.Group>
              <Form.Group
                className="mb-3  text-white  "
                controlId="formBasicText"
                style={{ fontWeight: "bold" }}
              >
                <Form.Label>categories : </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={categories}
                  onChange={(e) => {
                    setCategories(e.target.value);
                  }}
                >
                  <option className="frm_option"></option>
                  <option value="Burger" className="frm_option">
                    Burger
                  </option>
                  <option value="Fries" className="frm_option">
                    Fries
                  </option>
                  <option value="Sandwich" className="frm_option">
                    Sandwich
                  </option>
                  <option value="Drinks" className="frm_option">
                    Drinks
                  </option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                controlId="formFile"
                className="mb-3 text-white "
                style={{ fontWeight: "bold" }}
              >
                <Form.Label>Image:</Form.Label>
                <Form.Control type="file" onChange={onChnageFile} />
              </Form.Group>
            </Form>
            <div className="d-grid gap-2">
              <Button
                style={{ fontWeight: "bold" }}
                variant="outline-warning"
                size="lg"
                onClick={Submit}
              >
                Post
              </Button>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

export default Dash;

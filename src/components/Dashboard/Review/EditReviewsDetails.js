import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

import { Form, Button } from "react-bootstrap";

import "../dash.css";
import GlobalDash from "../GlobalDash";

import { API_URL } from "../../../constants";

import { IMG_URL } from "../../../constants";

import { Scrollbars } from "react-custom-scrollbars-2";

function EditReviewsDetails() {
  const [newTitle, setNewTitle] = useState({});
  const [newDescription, setNewDescription] = useState("");
  const [newCategories, setNewCategories] = useState("");
  const [newImage, setNewImage] = useState([]);

  const [get, setGet] = useState([]);

  const onChnageFile = (e) => {
    setNewImage(e.target.files[0]);
  };

  useEffect(() => {
    async function getData() {
      const url = `${API_URL}/api/get/review`;
      const res = await Axios.get(url);
      if (res) {
        setGet(res.data);
        console.log(res.data);
      } else {
        alert("Faild To Get Category");
      }
    }
    getData();
  }, []);

  const params = useParams();
  const [detailCategory, setDetailCategory] = useState([]);

  useEffect(() => {
    if (params) {
      get.forEach((get) => {
        if (get._id === params.id) setDetailCategory(get);
      });
    }
  }, [params, get]);

  console.log(detailCategory);

  const SubmitName = (id) => {
    const url = `${API_URL}/api/update/review/text/${id}`;
    Axios.put(url, {
      newTitle: newTitle,
    }).then((done, err) => {
      if (done) {
        window.location.reload();
        alert("Text Update Success");
      } else {
        alert("failed");
        console.log(err);
      }
    });
  };
  const SubmitDescription = (id) => {
    const url = `${API_URL}/api/update/review/text/${id}`;
    Axios.put(url, {
      newDescription: newDescription,
    }).then((done, err) => {
      if (done) {
        window.location.reload();
        alert("Text Update Success");
      } else {
        alert("failed");
        console.log(err);
      }
    });
  };
  const SubmitCategoris = (id) => {
    const url = `${API_URL}/api/update/review/text/${id}`;
    Axios.put(url, {
      newCategories: newCategories,
    }).then((done, err) => {
      if (done) {
        window.location.reload();
        alert("Text Update Success");
      } else {
        alert("failed");
        console.log(err);
      }
    });
  };

  const SubmitImg = (id) => {
    const formData = new FormData();
    formData.append("image", newImage);
    const url = `${API_URL}/api/update/review/img/${id}`;
    Axios.put(url, formData).then((done, err) => {
      if (done) {
        window.location.reload();
        alert("Img Update Success");
      } else {
        alert("failed");
        console.log(err);
      }
    });
  };

  return (
    <div className="">
      <section className="dash_box">
        <div className="Dashboard container">
          <GlobalDash />
        </div>
        <div className="Dashboard_content  ">
          <Scrollbars>
            <section className="dashboard_box mt-5 ">
              <Form encType="multipart/form-data" method="post">
                <Form.Label
                  className="text-light"
                  style={{ fontWeight: "bold" }}
                >
                  Food Name :
                </Form.Label>
                <Form.Group
                  className="mb-3 edit_details_frm_grp "
                  controlId="formBasicText"
                >
                  <Form.Control
                    defaultValue={detailCategory.title}
                    type="text"
                    className="Edit_Details_input"
                    placeholder="Enter Service Name"
                    onChange={(e) => {
                      setNewTitle(e.target.value);
                    }}
                  />
                  <Button
                    variant="outline-warning"
                    style={{ fontWeight: "bold" }}
                    onClick={() => {
                      SubmitName(detailCategory._id);
                    }}
                  >
                    Edit
                  </Button>
                </Form.Group>
                <Form.Label
                  className="text-light"
                  style={{ fontWeight: "bold" }}
                >
                  Food Price :
                </Form.Label>

                <Form.Label
                  className="text-light"
                  style={{ fontWeight: "bold" }}
                >
                  Food Description :
                </Form.Label>
                <Form.Group
                  className="mb-3  "
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Control
                    as="textarea"
                    rows={3}
                    defaultValue={detailCategory.description}
                    onChange={(e) => {
                      setNewDescription(e.target.value);
                    }}
                    type="text"
                    placeholder="Enter Service Description"
                  />
                  <div className="pt-1"></div>
                  <div className="d-grid gap-2">
                    <Button
                      variant="outline-warning"
                      style={{ fontWeight: "bold" }}
                      onClick={() => {
                        SubmitDescription(detailCategory._id);
                      }}
                    >
                      Edit
                    </Button>
                  </div>
                </Form.Group>

                <Form.Label
                  className="text-light"
                  style={{ fontWeight: "bold" }}
                >
                  {" "}
                  Food Categories :{" "}
                </Form.Label>
                <Form.Group
                  className="mb-3 edit_details_frm_grp "
                  controlId="formBasicText"
                >
                  <Form.Control
                    defaultValue={detailCategory.categories}
                    onChange={(e) => {
                      setNewCategories(e.target.value);
                    }}
                    type="text"
                    placeholder="Enter Service Categoris"
                  />
                  <Button
                    variant="outline-warning"
                    style={{ fontWeight: "bold" }}
                    onClick={() => {
                      SubmitCategoris(detailCategory._id);
                    }}
                  >
                    Edit
                  </Button>
                </Form.Group>

                <Form.Label
                  className="text-light"
                  style={{ fontWeight: "bold" }}
                >
                  Food Image:
                </Form.Label>
                <Form.Group
                  controlId="formFile"
                  className="mb-3 edit_details_frm_grp "
                >
                  <div>
                    <img
                      style={{ borderRadius: "10px" }}
                      src={IMG_URL + detailCategory.image}
                      alt=""
                      height="40px"
                      width="40px"
                    />
                  </div>
                  <Form.Control type="file" onChange={onChnageFile} />
                  <Button
                    variant="outline-warning"
                    style={{ fontWeight: "bold" }}
                    onClick={() => {
                      SubmitImg(detailCategory._id);
                    }}
                  >
                    Edit
                  </Button>
                </Form.Group>
              </Form>
            </section>
          </Scrollbars>
        </div>
      </section>
    </div>
  );
}

export default EditReviewsDetails;

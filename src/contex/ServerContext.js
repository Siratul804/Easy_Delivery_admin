import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constants";
export const ServerContext = createContext();

export const ServerProvider = (props) => {
  const [get, setGet] = useState([]);

  useEffect(() => {
    const url = `${API_URL}/api/get`;

    axios.get(url).then((res) => {
      console.log(res.data);
      setGet(res.data);
    });
  }, []);

  return (
    <ServerContext.Provider value={{ get: [get, setGet] }}>
      {props.children}
    </ServerContext.Provider>
  );
};

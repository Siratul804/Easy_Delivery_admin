import React, { useState, createContext, useEffect } from "react";
import axios from "axios";
export const ServerContext = createContext();

export const ServerProvider = (props) => {
  const [get, setGet] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/get").then((res) => {
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

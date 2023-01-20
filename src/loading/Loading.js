import React from "react";

import "./loading.css";

function Loading() {
  return (
    <div className="loading">
      <div className="ring"></div>
      <span className="loading_span">loading...</span>
    </div>
  );
}

export default Loading;

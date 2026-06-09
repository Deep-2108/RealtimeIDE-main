import React from "react";
import "./RunButton.css";
const RunButton = ({ handleRunCode }) => {
  return (
    <div className="output-header">
      <button onClick={handleRunCode}>Run Code</button>
    </div>
  );
};

export default RunButton;
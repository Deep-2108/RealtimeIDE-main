import React from "react";
import "./OutputSection.css";
const OutputSection = ({ output }) => {
  return (
    <div className="output-container">
      <textarea className="output-area" value={output} readOnly />
    </div>
  );
};

export default OutputSection;
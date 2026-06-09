import React from "react";
import "./StdinSection.css";
const StdinSection = ({ stdin, setStdin }) => {
  const handleStdinChange = (e) => {
    setStdin(e.target.value);
  };

  return (
    <div className="stdin-container">
      <label>Stdin:</label>
      <textarea
        className="stdin-area"
        value={stdin}
        onChange={handleStdinChange}
        placeholder="Enter input here..."
      />
    </div>
  );
};

export default StdinSection;
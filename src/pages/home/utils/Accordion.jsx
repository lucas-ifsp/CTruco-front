// src/Accordion.js
import React, { useState } from "react";

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={toggleAccordion}>
        <i className="bi bi-controller" /> {title}{" "}
        <span>
          {isOpen ? (
            <i
              style={{ alignSelf: "start", fontSize: "10px" }}
              className="bi bi-arrow-up"
            />
          ) : (
            <i
              style={{ alignSelf: "start", fontSize: "10px" }}
              className="bi bi-arrow-down"
            />
          )}
        </span>
      </div>
      {isOpen && <div className="accordion-content">{content}</div>}
    </div>
  );
};

export default Accordion;

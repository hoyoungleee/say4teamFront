import React, { useState } from "react";
import "./Acahive.css";
import { Link } from "react-router-dom";

export default function Acahive() {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  // 우선순위: hovered > selected
  const active = hovered || selected;

  return (
    <div className="acahive-container">
      <Link
        to="/project"
        className={`acahive-item ${active === "PRESS" ? "blur" : ""}`}
        onClick={() => setSelected("PROJECT")}
        onMouseEnter={() => setHovered("PROJECT")}
        onMouseLeave={() => setHovered(null)}
      >
        PROJECT
      </Link>
      <div className="acahive-divider" />
      <Link
        to="/press"
        className={`acahive-item ${active === "PROJECT" ? "blur" : ""}`}
        onClick={() => setSelected("PRESS")}
        onMouseEnter={() => setHovered("PRESS")}
        onMouseLeave={() => setHovered(null)}
      >
        PRESS
      </Link>
    </div>
  );
}

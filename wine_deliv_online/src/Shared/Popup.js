import React from "react";
import "./popUpStyle.css";

function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popupcontent">{props.children}</div>
    </div>
  ) : (
    ""
  );
}

export default Popup;

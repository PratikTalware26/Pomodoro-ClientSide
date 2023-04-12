import React from "react";
import "./RegisterPopup.css";

const RegisterPopup = ({ closePopup }) => {
  return (
    <div className="register-popup">
      <h3>Registered Successfully</h3>
      <div className="popup-close-btn-cont">
        <button onClick={closePopup}>Go to SignIn</button>
      </div>
    </div>
  );
};

export default RegisterPopup;

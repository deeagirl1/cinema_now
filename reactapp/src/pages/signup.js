import React from "react";
import Register from "../components/signup_component";
const SignUp = () => {
  return (
    <div
      style={{
        display: "flex",
        marginTop: "50px",
        justifyContent: "center",
        alignItems: "top",
        height: "5vh",
      }}
    >
      <div className="container">
        <Register />
      </div>
    </div>
  );
};

export default SignUp;

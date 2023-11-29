import React from "react";
import ButtonLink from "../components/Button/ButtonLink";

function NotFound() {
  return (
    <div className="flex-column" style={{ gap: "50px" }}>
      <h2 style={{ marginTop: "20px", fontSize: "32px" }}>Sorry !</h2>
      <h2>Error 404 : This page doesnt exit... yet?</h2>
      <ButtonLink href="/" label="Return to home safely" />
    </div>
  );
}

export default NotFound;

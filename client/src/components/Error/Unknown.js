import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="bounds error--div">
    <p>&nbsp;</p>
    <h1 className="error--h1">5OO</h1>
    <h2 className="error--h2">ERR0R UNKN0WN</h2>
    <p>&nbsp;</p>
    <p className="error--p">
      Sorry, this page isn't working <br />
    </p>
    <p>&nbsp;</p>
    <Link
      to="/"
      className="button button-secondary button--custom"></Link>
  </div>
);

import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="bounds error--div">
    <p>&nbsp;</p>
    <h1 className="error--h1">4O3</h1>
    <h2 className="error--h2">F0RBIDDEN</h2>
    <p>&nbsp;</p>
    <p className="error--p">
      You don't have permission to access this
      page.
    </p>
    <p>&nbsp;</p>
    <Link
      to="/"
      className="button button-secondary button--custom"></Link>
  </div>
);

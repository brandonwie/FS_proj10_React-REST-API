import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <div className="bounds error--div">
    <p>&nbsp;</p>
    <h1 className="error--h1">4O4</h1>
    <h2 className="error--h2">PAGE N0T F0UND</h2>
    <p>&nbsp;</p>
    <p className="error--p">
      Sorry! We couldn't find the page you're
      looking for.
    </p>
    <p>&nbsp;</p>
    <Link
      to="/"
      className="button button-secondary button--custom"></Link>
  </div>
);

import React from "react";
import { Redirect } from "react-router-dom";

export default ({ context }) => {
  try {
    context.actions.signOut();
  } catch (err) {
    console.log("[SignOut] Error: ", err);
    this.props.history.push("/error");
  }

  return <Redirect to="/" />;
};

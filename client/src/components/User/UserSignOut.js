import React from "react";
import { Redirect } from "react-router-dom";

export default ({ context }) => {
  try {
    setTimeout(() => {
      context.actions.signOut();
    }, 100);
  } catch (err) {
    console.log(
      "[UserSignOut][Try-Catch] Error: ",
      err
    );
    this.props.history.push("/error");
  }

  return <Redirect to="/" />;
};

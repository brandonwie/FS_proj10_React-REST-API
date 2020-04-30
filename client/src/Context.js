import React, { Component } from "react";
import Data from "./Data";
import Cookies from "js-cookie";

const Context = React.createContext();

export class Provider extends Component {
  state = {
    authenticatedUser:
      Cookies.getJSON("authenticatedUser") ||
      null,
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser } = this.state;

    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
      },
    };

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }

  signIn = async (emailAddress, password) => {
    const res = await this.data.getUser(
      emailAddress,
      password
    );

    if (res.id) {
      res.password = password;
      this.setState(() => {
        return { authenticatedUser: res };
      });

      Cookies.set(
        "authenticatedUser",
        JSON.stringify(res),
        { expires: 1 }
      );
      return res;
    } else {
      console.log("Error from Context.js: ", res);
      return res;
    }
  };

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove("authenticatedUser");
  };
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

//*  a higher-order function named withContext that wraps a provided component in a <Context.Consumer> component.
export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => (
          <Component
            {...props}
            context={context}
          />
        )}
      </Context.Consumer>
    );
  };
}

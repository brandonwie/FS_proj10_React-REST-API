import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Form from "./Form";

export default class UserSignIn extends Component {
  state = {
    emailAddress: "",
    password: "",
    errors: [],
  };

  render() {
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    const { context } = this.props;
    const authUser = context.authenticatedUser;

    if (!authUser) {
      return (
        <div className="bounds">
          <div className="grid-33 centered signin">
            <h1 className="signInOut">Sign In</h1>
            <Form
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              submitButtonText="Sign In"
              elements={() => (
                <React.Fragment>
                  <div>
                    <div>
                      <input
                        id="emailAddress"
                        name="emailAddress"
                        type="text"
                        value={emailAddress}
                        onChange={this.change}
                        placeholder="Email Address"
                      />
                    </div>
                    <div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={this.change}
                        placeholder="Password"
                      />
                    </div>
                  </div>
                </React.Fragment>
              )}
            />
            <p>&nbsp;</p>
            <p className="account--message">
              Don't have a user account?{" "}
              <Link
                to="/signup"
                className="click--here">
                Click here
              </Link>{" "}
              to sign up!
            </p>
          </div>
        </div>
      );
    } else {
      // if authenticated, push user to "/"
      return <Redirect to={"/"} />;
    }
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  submit = () => {
    //* sign-in this.props.context to "context"
    const { context } = this.props;
    const { emailAddress, password } = this.state;
    const { from } = this.props.location
      .state || {
      from: { pathname: "/" },
    };

    context.actions
      .signIn(emailAddress, password)
      .then((res) => {
        if (res.length) {
          this.setState({ errors: res });
        } else {
          this.props.history.push(from);
          console.log(
            `SUCCESS! ${res.emailAddress} is now signed in!`
          );
        }
      })
      .catch((err) => {
        console.log("[SignIn] Error: ", err);
        this.props.history.push("/error");
      });
  };

  cancel = () => {
    this.props.history.push("/");
  };
}

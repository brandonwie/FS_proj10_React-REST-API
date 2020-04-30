import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Form from "./Form";

export default class UserSignIn extends Component {
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    errors: [],
  };

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors,
    } = this.state;

    const { context } = this.props;
    const authUser = context.authenticatedUser;
    if (!authUser) {
      return (
        <div className="bounds">
          <div className="grid-33 centered signin">
            <h1 className="signInOut">Sign Up</h1>
            <Form
              cancel={this.cancel}
              errors={errors}
              submit={this.submit}
              submitButtonText="Sign Up"
              elements={() => (
                <React.Fragment>
                  <div>
                    <div>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={firstName}
                        onChange={this.change}
                        placeholder="First Name"
                      />
                    </div>
                    <div>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={lastName}
                        onChange={this.change}
                        placeholder="Last Name"
                      />
                    </div>
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
                    <div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={this.change}
                        placeholder="Confirm Password"
                      />
                    </div>
                  </div>
                </React.Fragment>
              )}
            />
            <p>&nbsp;</p>
            <p className="account--message">
              Already have a user account?{" "}
              <Link
                to="/signin"
                className="click--here">
                Click here
              </Link>{" "}
              to sign in!
            </p>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/" />;
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
    const {
      firstName,
      lastName,
      emailAddress,
      password,
    } = this.state;

    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    context.data
      .createUser(user)
      .then((res) => {
        if (res.length) {
          this.setState({ errors: res });
        } else {
          context.actions
            .signIn(emailAddress, password)
            .then(() => {
              this.props.history.push("/");
            });
        }
      })
      .catch((err) => {
        console.log("[SignUp] Error: ", err);
        this.props.history.push("/error");
      });
  };

  cancel = () => {
    this.props.history.push("/");
  };
}

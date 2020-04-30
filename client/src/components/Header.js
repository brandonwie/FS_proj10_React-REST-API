import React from "react";
import { Link, NavLink } from "react-router-dom";

export default class Header extends React.PureComponent {
  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    return (
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">
            <Link
              to="/"
              className="header--custom">
              Courses
            </Link>
          </h1>
          <nav>
            {authUser ? (
              <React.Fragment>
                <span>
                  Hi, {authUser.firstName}{" "}
                  {authUser.lastName}!
                </span>
                <Link to="/signout">
                  Sign Out
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NavLink
                  className="signup sign--button"
                  to="/signup">
                  Sign Up
                </NavLink>
                <NavLink
                  className="signin sign--button"
                  to="/signin">
                  Sign In
                </NavLink>
              </React.Fragment>
            )}
          </nav>
        </div>
      </div>
    );
  }
}

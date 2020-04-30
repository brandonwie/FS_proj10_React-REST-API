import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import withContext from "./Context";

// Components
import Header from "./components/Header";
import Courses from "./components/Course/Courses";
import CourseDetail from "./components/Course/CourseDetail";
import CreateCourses from "./components/Course/CreateCourse";
import NotFound from "./components/Error/NotFound";
import UserSignUp from "./components/User/UserSignUp";
import UserSignIn from "./components/User/UserSignIn";
import UserSignOut from "./components/User/UserSignOut";
import Forbidden from "./components/Error/Forbidden";
import Unknown from "./components/Error/Unknown";

// Components with Context
const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(
  CourseDetail
);
const CreateCoursesWithContext = withContext(
  CreateCourses
);
const UserSignUpWithContext = withContext(
  UserSignUp
);
const UserSignInWithContext = withContext(
  UserSignIn
);
const UserSignOutWithContext = withContext(
  UserSignOut
);

export default () => (
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route
          exact
          path="/"
          component={CoursesWithContext}
        />
        <Route
          exact
          path="/signup"
          component={UserSignUpWithContext}
        />
        <Route
          exact
          path="/signin"
          component={UserSignInWithContext}
        />
        <Route
          path="/signout"
          component={UserSignOutWithContext}
        />
        <PrivateRoute
          path="/courses/create"
          component={CreateCoursesWithContext}
        />
        <Route
          path="/courses/:id"
          component={CourseDetailWithContext}
        />
        <Route
          path="/forbidden"
          component={Forbidden}
        />
        <Route
          path="/notfound"
          component={NotFound}
        />
        <Route
          path="/error"
          component={Unknown}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

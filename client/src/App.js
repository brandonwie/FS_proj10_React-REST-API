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
// User Components
import UserSignUp from "./components/User/UserSignUp";
import UserSignIn from "./components/User/UserSignIn";
import UserSignOut from "./components/User/UserSignOut";
// Course Components
import Courses from "./components/Course/Courses";
import CourseDetail from "./components/Course/CourseDetail";
import CreateCourses from "./components/Course/CreateCourse";
import UpdateCourse from "./components/Course/UpdateCourse";
// Error Components
import NotFound from "./components/Error/NotFound";
import Forbidden from "./components/Error/Forbidden";
import UnhandledError from "./components/Error/UnhandledError";

// Components with Context
const HeaderWithContext = withContext(Header);
// User with Context
const UserSignUpWithContext = withContext(
  UserSignUp
);
const UserSignInWithContext = withContext(
  UserSignIn
);
const UserSignOutWithContext = withContext(
  UserSignOut
);
// Course with Context
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(
  CourseDetail
);
const CreateCoursesWithContext = withContext(
  CreateCourses
);
const UpdateCourseWithContext = withContext(
  UpdateCourse
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
          exact
          path="/courses/:id"
          component={CourseDetailWithContext}
        />
        <PrivateRoute
          exact
          path="/courses/:id/update"
          component={UpdateCourseWithContext}
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
          component={UnhandledError}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

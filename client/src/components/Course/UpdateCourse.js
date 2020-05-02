import React, { Component } from "react";
import Form from "../Form";

class UpdateCourse extends Component {
  state = {
    course: {},
    errors: [],
  };

  async componentDidMount() {
    try {
      const { context } = this.props;
      const authUser = context.authenticatedUser;

      const course = await context.data.getCourse(
        this.props.match.params.id
      );
      if (course) {
        if (course.User.id === authUser.id) {
          this.setState({ course });
        } else {
          this.props.history.push("/forbidden");
        }
      } else {
        console.log(
          "[Get][Course][in Update] Error 404 : No Course Found"
        );
        this.props.history.push("/notfound");
      }
    } catch (err) {
      console.log(
        "[GET][Course][in Update][Try-Catch] Error: ",
        err
      );
      this.props.history.push("/error");
    }
  }

  render() {
    const { course, errors } = this.state;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = course;
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const { firstName, lastName } = authUser;

    return (
      <div className="bounds course--detail course--div-1">
        <h1>Update Course</h1>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Update Course"
          elements={() => (
            <React.Fragment>
              <div className="grid-66 course--div-2">
                <div className="course--header">
                  <h4 className="course--label">
                    Course
                  </h4>
                  <div>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      className="input-title course--title--input"
                      placeholder="Course title..."
                      value={title || ""}
                      onChange={this.change}
                    />
                  </div>
                  <p>
                    By {firstName} {lastName}
                  </p>
                </div>
                <div className="course--description">
                  <div>
                    <textarea
                      id="description"
                      name="description"
                      type="text"
                      placeholder="Course description..."
                      value={description || ""}
                      onChange={this.change}
                    />
                  </div>
                </div>
              </div>
              <div className="grid-25 grid-right course--div-3">
                <div className="course--stats course--div--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item course--div-4">
                      <h4>Estimated Time</h4>
                      <div>
                        <input
                          id="estimatedTime"
                          name="estimatedTime"
                          type="text"
                          className="course--time--input"
                          placeholder="Hours"
                          value={
                            estimatedTime || ""
                          }
                          onChange={this.change}
                        />
                      </div>
                    </li>
                    <li className="course--stats--list--item course--div-4">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea
                          id="materialsNeeded"
                          name="materialsNeeded"
                          placeholder="List materials... with an * separated by a space"
                          value={
                            materialsNeeded || ""
                          }
                          onChange={this.change}
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </React.Fragment>
          )}
        />
      </div>
    );
  }

  change = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState((prevState) => ({
      course: {
        ...prevState.course,
        [name]: value,
      },
    }));
  };

  submit = () => {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const emailAddress = authUser.emailAddress;
    const password = authUser.password;
    const { course } = this.state;
    const {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = course;
    const courseData = {
      id,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    context.data
      .updateCourse(
        courseData,
        emailAddress,
        password
      )
      .then((res) => {
        if (res.length) {
          console.log(
            "[Update][Course] Error: ",
            res
          );
          this.setState({ errors: res });
        } else {
          this.props.history.push(
            `/courses/${this.props.match.params.id}`
          );
        }
      })
      .catch((err) => {
        console.log(
          "[Update][Course][Catch] Error: ",
          err
        );
        this.props.history.push("/error");
      });
  };

  cancel = () => {
    this.props.history.push(
      `/courses/${this.props.match.params.id}`
    );
  };
}

export default UpdateCourse;

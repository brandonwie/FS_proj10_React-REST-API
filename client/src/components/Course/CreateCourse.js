import React, { Component } from "react";
import Form from "../User/Form";

class CreateCourse extends Component {
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    MaterialsNeeded: "",
    errors: [],
  };

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
    } = this.state;

    const { context } = this.props;
    const authUser = context.authenticatedUser;

    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Create Course"
          elements={() => (
            <React.Fragment>
              <div className="grid-66">
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
                      value={title}
                      onChange={this.change}
                      placeholder="Course title..."
                    />
                  </div>
                  <p>
                    By {authUser.firstName}{" "}
                    {authUser.lastName}
                  </p>
                </div>
                <div className="course--description">
                  <div>
                    <textarea
                      id="description"
                      name="description"
                      value={description}
                      onChange={this.change}
                      placeholder="Course description..."></textarea>
                  </div>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <div>
                        <input
                          id="estimatedTime"
                          name="estimatedTime"
                          className="course--time--input"
                          type="text"
                          value={estimatedTime}
                          onChange={this.change}
                          placeholder="Hours"
                        />
                      </div>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <div>
                        <textarea
                          id="materialsNeeded"
                          name="materialsNeeded"
                          value={materialsNeeded}
                          onChange={this.change}
                          placeholder="List materials..."></textarea>
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

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  submit = () => {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const { emailAddress, password } = authUser;

    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };

    const { from } = this.props.location
      .state || {
      from: { pathname: "/" },
    };

    console.log(
      "credentials: ",
      emailAddress,
      password
    );
    console.log("course: ", course);
    context.data
      .postCourse(course, emailAddress, password)
      .then((data) => {
        console.log(data);
        if (data !== null) {
          this.setState({ errors: data });
        } else {
          console.log(
            `The course: ${title} is created!`
          );
          this.props.history.push(from);
        }
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/error");
      });
  };

  cancel = () => {
    this.props.history.push("/");
  };
}

export default CreateCourse;

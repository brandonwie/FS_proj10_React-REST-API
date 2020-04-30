import config from "./config";

export default class Data {
  //! first method
  //* API endpoint = 'path'
  api(
    path,
    method = "GET",
    body = null,
    requireAuth = false,
    credentials = null
  ) {
    const url = config.apiBaseUrl + path;
    const options = {
      method,
      headers: {
        "Content-Type":
          "application/json; charset=utf-8",
      },
    };
    //! if body is provided, sends "method", "headers" and "stringified body".
    if (body !== null) {
      options.body = JSON.stringify(body);
    }
    // Check if authentication is required
    if (requireAuth) {
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
      );
      // push authentication to header
      options.headers[
        "Authorization"
      ] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  async getUser(emailAddress, password) {
    const res = await this.api(
      `/users`,
      "GET",
      null,
      true,
      { emailAddress, password }
    );
    if (res.status === 200) {
      return res.json().then((data) => data);
    } else if (
      res.status === 400 ||
      res.status === 401
    ) {
      return res.json().then((data) => {
        console.log(
          `[GET][User] ${res.status} - Errors: `,
          data.errors
        );
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async createUser(user) {
    const res = await this.api(
      `/users`,
      "POST",
      user
    );
    if (res.status === 201) {
      console.log(
        `A new user, ${user.emailAddress} has been created!`
      );
      return [];
    } else if (res.status === 400) {
      return res.json().then((data) => {
        console.log(
          "[POST][User] 400 - Bad Request: ",
          data.errors
        );
        return data.errors;
      });
    } else {
      throw new Error(
        "[POST][User] Unknown Error"
      );
    }
  }

  async getCourses() {
    const res = await this.api("/courses", "GET");
    if (res.status === 200) {
      return res.json().then((data) => data);
    } else if (res.status === 401) {
      return res.json().then((data) => {
        console.log(
          "[GET][Courses] 401 - Unauthorized: ",
          data.errors
        );
        return data.errors;
      });
    } else {
      throw new Error("[GET][Course]");
    }
  }

  async getCourse(id) {
    const res = await this.api(
      `/courses/${id}`,
      "GET"
    );
    if (res.status === 200) {
      return res.json().then((data) => data);
    } else if (res.status === 401) {
      return res.json().then((data) => {
        console.log(
          "[GET][Course] 401 - Unauthorized: ",
          data.errors
        );
        return data.errors;
      });
    } else {
      throw new Error(
        "[GET][Course] Unknown Error"
      );
    }
  }

  async postCourse(
    course,
    emailAddress,
    password
  ) {
    const res = await this.api(
      "/courses",
      "POST",
      course,
      true,
      { emailAddress, password }
    );
    if (res.status === 201) {
      return null;
    } else if (res.status === 400) {
      return res.json().then((data) => {
        console.log(
          "[POST][Course] 400 - Bad Request: ",
          data.errors
        );
        return data.errors;
      });
    } else {
      throw new Error(
        "[POST][Course] Unknown Error"
      );
    }
  }

  async deleteCourse(id, emailAddress, password) {
    console.log("ID TYPE: ", typeof id);
    const res = await this.api(
      `/courses/${id}`,
      "DELETE",
      null,
      true,
      { emailAddress, password }
    );
    if (res.status === 204) {
      console.log("[DELETE][Course] Successful!");
      return [];
    } else if (res.status === 403) {
      return res.json().then((data) => {
        console.log(
          "[DELETE][Course] Error 403 - Forbidden: ",
          data.errors
        );
        return data.errors;
      });
    } else if (res.status === 404) {
      return res.json().then((data) => {
        console.log(
          "[DELETE][Course] 404 - Not Found : ",
          data.errors
        );
        return data.errors;
      });
    } else {
      throw new Error(
        "[DELETE][Course] Unknown Error"
      );
    }
  }
}

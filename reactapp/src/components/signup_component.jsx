import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { store } from "react-notifications-component";
import AuthService from "./services/AuthService";

const notificationSuccessful = {
  title: "Successful!",
  message: "You have registered succesfully!",
  type: "success",
  insert: "top",
  container: "top-center",
  animationIn: ["animate__animated animate__fadeIn"],
  animationOut: ["animate__animated animate__fadeOut"],
  dismiss: {
    duration: 1000,
  },
};
const notificationUnSuccessful = {
  title: "Something went wrong!",
  message: "Please try again!",
  type: "danger",
  insert: "top",
  container: "top-center",
  animationIn: ["animate__animated animate__fadeIn"],
  animationOut: ["animate__animated animate__fadeOut"],
  dismiss: {
    duration: 1000,
  },
};

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      successful: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value,
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeConfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.firstName,
        this.state.lastName,
        this.state.password
      ).then(
        (response) => {
          store.addNotification({
            ...notificationSuccessful,
            container: "top-center",
          });
          this.setState({
            message: response.data.message,
            successful: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          store.addNotification({
            ...notificationUnSuccessful,
            container: "top-center",
          });
          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div>
          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <h1>Register now!</h1>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter your username..."
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter your first name..."
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.onChangeFirstName}
                    validations={[required]}
                  />
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Enter your last name"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={this.onChangeLastName}
                    validations={[required]}
                  />
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Enter your email address"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Enter your password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>
                <br />
                <div className="form-group">
                  <label htmlFor="already-have-an-account" href="/sign-in">
                    Already have an account? <a href="/sign-in">Sign In</a>
                  </label>
                </div>
                <br />
                <div className="form-group">
                  <button className="btn btn-primary btn-block" id="submit">Sign Up</button>
                </div>
              </div>
            )}
            <br />
            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

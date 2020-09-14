import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
import * as userService from "../services/usersService";
import authService from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { name: "", email: "", password: "" },
    errors: {},
  };
  schema = {
    name: Joi.string().required().min(5).max(30).label("Yourname"),
    password: Joi.string().min(5).max(50).label("Password"),
    email: Joi.string().required().email().min(5).max(50).label("email"),
  };

  doSubmit = async () => {
    try {
      //throw "new err";
      const response = await userService.register(this.state.data);
      authService.loginWithJwt(response.headers["x-auth-token"]);
      this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="center">
        <h1>Register</h1>
        <form
          style={{ display: "inline-block" }}
          className="col col-12"
          onSubmit={this.handleSubmit}
        >
          {this.renderInput("name", "Yourname")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("email", "email")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;

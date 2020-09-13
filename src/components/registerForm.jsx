import React from "react";
import Joi from "joi-browser";
import Form from "./Form";

class RegisterForm extends Form {
  state = {
    data: { name: "", email: "", password: "" },
    errors: {},
  };
  schema = {
    name: Joi.string().required().min(5).max(30).label("Yourname"),
    password: Joi.string().min(5).max(50).label("Password"),
    email: Joi.string().required().email().min(5).max(50).label("Your email"),
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

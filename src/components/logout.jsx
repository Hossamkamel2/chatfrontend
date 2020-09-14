import React, { Component } from "react";
import { logout } from "./../services/authService";
class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    logout();
    window.location = "/login";
  }
  render() {
    return null;
  }
}

export default Logout;

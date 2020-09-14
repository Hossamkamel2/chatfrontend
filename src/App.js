import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.css";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import Messages from "./components/messages";
import NavBar from "./components/navBar";
import NotFound from "./components/notfound";
import Logout from "./components/logout";
import { ToastContainer } from "react-toastify";
import authService from "./services/authService";
import MessageForm from "./components/messageForm";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = authService.getCurrentUser();
    this.setState({ user });
  }
  render() {
    return (
      <div>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <div className="content">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/:id" component={MessageForm} />
            <Route
              exact
              path="/"
              render={(props) => {
                if (!this.state.user) return <Redirect to="/login" />;
                return <Messages {...props} user={this.state.user} />;
              }}
            />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import Form from "./Form";
import Joi from "joi-browser";
import { getMessages, addMessage } from "./../services/messService";
import { getCurrentUser } from "../services/authService";

class Messages extends Form {
  state = {
    data: { message: "" },
    errors: {},
    messList: [],
  };
  schema = {
    message: Joi.string().required().label("message"),
  };
  async componentDidMount() {
    const returned = await getMessages();
    let messList = returned.data;
    //const _iid = user._id;
    //const data = { _id: _iid, message: "" };
    this.setState({ messList });

    console.log(this.state.messList);
  }
  async doSubmit() {
    try {
      await addMessage(this.state.data.message);
      let messages = this.state.messList;
      messages.add(this.state.data.message);
      this.setState({ messList: messages });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  }

  render() {
    const { messList } = this.state;
    const { user } = this.props;

    return (
      <React.Fragment>
        <div className="post col col-6">
          <h4>Leave your message here...</h4>
          <form className="col col-12" onSubmit={this.handleSubmit}>
            {this.renderInput("message", "message")}
            {this.renderButton("Send")}
          </form>
        </div>

        <div className="col post col-6">
          {messList.map((message) => (
            <div className="mb-4" key={message._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{message.sender.name}</h5>
                  <p className="card-text">{message.message}</p>
                  {user._id === message.sender._id && (
                    <button className="btn btn-danger">Delete</button>
                  )}

                  {user._id === message.sender._id && (
                    <button className="btn btn-link">Edit</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Messages;

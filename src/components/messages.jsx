import { Link } from "react-router-dom";
import React from "react";
import Form from "./Form";
import Joi from "joi-browser";
import { getMessages, deleteMessage } from "./../services/messService";
import io from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3000";
const socket = io(ENDPOINT);

class Messages extends Form {
  state = {
    data: { message: "" },
    errors: {},
    messList: [],
  };
  schema = {
    message: Joi.string().required().label("message"),
  };

  constructor() {
    super();
    //const { user } = this.props;
    //this.setState({ user });
  }

  getMessages = async () => {
    const returned = await getMessages();
    let messList = returned.data;

    this.setState({ messList });
  };

  async componentDidMount() {
    const returned = await getMessages();
    let messList = returned.data;

    socket.on("newMessage", (data) => {
      this.setState({ messList: [...this.state.messList, data] });
    });
    this.setState({ messList });
    console.log("im here");
  }

  async doSubmit() {
    try {
      const send = {
        sender: this.props.user._id,
        message: this.state.data.message,
      };
      socket.emit("message", send);
      //await addMessage(this.state.data.message);

      const data = { message: "" };
      this.setState({ data });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  }
  handleDelete = async (id) => {
    try {
      await deleteMessage(id);
      const messList = this.state.messList.filter((mess) => mess._id !== id);
      console.log(id);

      this.setState({ messList });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

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
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleDelete(message._id)}
                    >
                      Delete
                    </button>
                  )}

                  {user._id === message.sender._id && (
                    <Link
                      className="m-2 btn btn-primary"
                      to={`/${message._id}`}
                    >
                      Edit
                    </Link>
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

import React from "react";
import Joi from "joi-browser";
import Form from "./Form";
import { getMessagesbyid } from "../services/messService";
import { editMessage } from "./../services/messService";

class MessageForm extends Form {
  state = {
    data: {
      message: "",
    },
    errors: {},
  };

  schema = {
    message: Joi.string().required().label("message"),
  };
  async componentDidMount() {
    const messId = this.props.match.params.id;
    const mess = await getMessagesbyid(messId);
    console.log(mess);
    if (!mess) return this.props.history.replace("not-found");
    this.setState({ data: this.mapToViewModel(mess.data) });
  }
  mapToViewModel(message) {
    return {
      message: message.message,
    };
  }

  doSubmit = async () => {
    try {
      console.log(this.state.data.message);
      await editMessage(this.props.match.params.id, this.state.data.message);
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
      <div className="post col col-6">
        <h4>Edit...</h4>
        <form className="col col-12" onSubmit={this.handleSubmit}>
          {this.renderInput("message", "message")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MessageForm;

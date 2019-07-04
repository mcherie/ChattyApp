import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

class ChatBar extends Component {
  constructor(props) {
    super(props);
  }

  handleNameChange = (event) => {
    console.log("event", event);
    if (event.key === 'Enter') {
      event.preventDefault();

      if (this.props.currentUser.name === event.target.value) {
        return
      }

      this.props.onNameChange({
        content: `${this.props.currentUser.name} has changed their name to ${event.target.value}.`,
        name: event.target.value
      });
    }
  }

  handleSubmit = (event) => {
    console.log("event", event);
    if (event.key === 'Enter') {
      event.preventDefault();

      let user = findDOMNode(this.refs.username).value.trim()

      this.props.onSubmit({
        username: user,
        content: event.target.value
      });
      event.target.value = '';
    }
  }

  render() {
    return (
      <form className="chatbar" onSubmit={this.handleSubmit}>
        <input
          placeholder="Enter your username"
          className="chatbar-username"
          type="text"
          ref="username"
          name="username"
          defaultValue={this.props.currentUser.name}
          onKeyPress={this.handleNameChange} />
        <input
          className="chatbar-message"
          type="text"
          name="content"
          placeholder="Type a message and then hit ENTER"
          defaultValue=""
          onKeyPress={this.handleSubmit} />
      </form>
    );
  }
}

export default ChatBar;

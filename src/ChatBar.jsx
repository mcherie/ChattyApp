import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

class ChatBar extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (event) => {
    console.log("event", event);
    if (event.key == 'Enter') {
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
          className="chatbar-username"
          type="text"
          ref="username"
          name="username"
          defaultValue={this.props.currentUser.name} />
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

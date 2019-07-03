import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (event) => {
    console.log("event", event);
    if (event.key == 'Enter') {
      event.preventDefault();
      this.props.onSubmit({
        username: this.props.currentUser.name,
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

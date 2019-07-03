import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = (event) => {
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
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="username"
          defaultValue={this.props.currentUser.name} />
        <input
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

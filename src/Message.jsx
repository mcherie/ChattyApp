import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div className="message">
        {/* <div className="username"> */}
      <div className="message-username">
          {this.props.message.username}
          {/* {this.props.message.message-username} */}

        </div>

        {/* <div className="content"> */}
        <div className="message-content">
          {this.props.message.content}
          {/* {this.props.message.message-content} */}

        </div>
      </div>
    );
  }
}

export default Message;




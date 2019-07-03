import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <div className="message-list">
        {this.props.messages.map(function (message, index) {
          return <Message key={index} message={message} />
        })}
      </div>
    );
  }
}

export default MessageList;

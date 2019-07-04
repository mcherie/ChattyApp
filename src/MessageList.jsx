import React, { Component } from 'react';
import Message from './Message.jsx';

// The component that renderts the message list
class MessageList extends Component {
  render() {
    return (
      <div className="message-list">
        {this.props.messages.map(function (message, index) {
          if (message.type === 'incomingNotification') {
            return (
              <div className="notification">
                <span className="notification-content">{message.content}</span>
              </div>
            )
          }
          return <Message key={index} message={message} />
          
        })}
      </div>
    );
  }
}

export default MessageList;

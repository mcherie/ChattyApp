import React, { Component } from 'react';

class Message extends Component {
  render() {
    return (
      <div className="message">
        {/* <div className="username"> */}
        <div className={`message-username ${this.props.message.colour}`}>
          {this.props.message.username}
          {/* {this.props.message.message-username} */}

        </div>

        {/* <div className="content"> */}
        <div className="message-content">
          {this.props.message.content}
          {/* {this.props.message.message-content} */}

        </div>
        {this.props.message.image.map(function (image, index) {
          return (<p key={index}><img className="message-image" src={image} alt={image} /></p>);
        })}
      </div>
    );
  }
}

export default Message;




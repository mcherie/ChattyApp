import React, { Component } from 'react';

// The component that renders the messages, including the username and the content message
class Message extends Component {
  render() {
    return (

      <div className="message">

        <div className={`message-username ${this.props.message.colour}`}>
          {this.props.message.username}
        </div>
        <div className="message-content">
          {this.props.message.content}
        </div>
    
        {this.props.message.image.map(function (image, index) {
          return (<p key={index}><img className="message-image" src={image} alt={image} /></p>);
        })}

      </div>
      
    );
  }
}

export default Message;




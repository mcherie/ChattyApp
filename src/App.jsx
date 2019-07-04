import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: ""},
      messages: [],
      onlineUsers: "0 Users online"
    }
  }

  componentDidMount() {

    this.socket = new WebSocket('ws://0.0.0.0:3001/');

    this.socket.onmessage = (event) => {
      // The socket event data is encoded as a JSON string.
      // This line turns it into an object
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "incomingMessage":
          this.setState({
            messages: [...this.state.messages, data]
          });
          break;
        case "incomingNotification":
          this.setState({
            messages: [...this.state.messages, data]
          });
          break;
        case "activeUsers":
          this.setState({
            onlineUsers: data.content
          });
          break;
        default:
          // Show an error in the console if the message type is unknown
          throw new Error("Unknown event type " + data.type);
      }
    };

    console.log('Connected to server')
  }

  postMessage = (message) => {
    message.type = 'postMessage'

    this.setState({
      currentUser: { name: message.username }
    });

    this.socket.send(JSON.stringify(message))
    console.log(JSON.stringify(message))
  }

  postNotification = (message) => {
    message.type = 'postNotification'
    this.setState({
      currentUser: { name: message.name }
    });

    delete message.name

    this.socket.send(JSON.stringify(message))
    console.log(JSON.stringify(message))
  }

  render() {
    return (
      <div>
        <NavBar onlineUser={this.state.onlineUsers}/>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} onSubmit={this.postMessage}
        onNameChange={this.postNotification}/>
      </div>
    );
  }
}

export default App;


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
    // console.log("componentDidMount <App />");
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = { id: 3, username: "Michelle", content: "Hello there!" };
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({ messages: messages })
    // }, 3000);

    this.socket = new WebSocket('ws://0.0.0.0:3001/');

    this.socket.onmessage = (event) => {
      console.log(event);
      // The socket event data is encoded as a JSON string.
      // This line turns it into an object
      const data = JSON.parse(event.data);
      console.log(data);
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
          // show an error in the console if the message type is unknown
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
        {/* <h1>Chatty</h1> */}
        <NavBar onlineUser={this.state.onlineUsers}/>
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} onSubmit={this.postMessage}
        onNameChange={this.postNotification}/>
      </div>
    );
  }
}
export default App;


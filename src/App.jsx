import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: "Bob" },
      messages: []
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

      const data = JSON.parse(event.data);
      console.log(data);

      this.setState({
        messages: [...this.state.messages, data]
      });
    }

    console.log('Connected to server')
  }


  addMessage = (message) => {
    this.socket.send(JSON.stringify(message))
    console.log(JSON.stringify(message))
  }

  render() {
    return (
      <div>
        {/* <h1>Chatty</h1> */}
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser} onSubmit={this.addMessage} />
      </div>
    );
  }
}
export default App;


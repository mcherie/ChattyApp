/* eslint-disable no-console */
const express = require('express');
const uuid = require('uuid/v4');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const colours = [
  'user-violet', 'user-blue', 'user-brown', 'user-red'
]

// Create the WebSockets server
const wss = new SocketServer({
  server
});


const postActiveUsers = (clients) => {
  const count = clients.size
  const data = {
    type: 'activeUsers',
    content: `${count} users online`
  }

  sendToClients(clients, data);
}

const sendToClients = (clients, data) => {
  clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  postActiveUsers(wss.clients);

  ws.on('message', (msg) => {
    const data = JSON.parse(msg);

    console.log('Raw Message', msg)

    switch (data.type) {
      case 'postMessage':
        parseMessage(data);
        break;

      case 'postNotification':
        data.type = 'incomingNotification'
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error('Unknown event type ' + data.type);
    }

    sendToClients(wss.clients, data);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');

    postActiveUsers(wss.clients)
  });
});

//  -------------THIS IS MY ATTEMPT AT DOING THE STRECTH EXERCISES -------------------
const parseMessage = (data) => {
  console.log(`User ${data.username} said ${data.content} ${data.colour}`);
  data.type = 'incomingMessage';
  if (data.colour === undefined) {
    data.colour = colours[Math.floor(Math.random() * 4)];
  }
  // Generate UUID
  data['id'] = uuid();

  // TODO: Update Regex to extract url
  const images = /*data.content.match(/http(.*?)+(.)+(jpg|png|gif)/, 'gs') || */ []
  data['image'] = images;

  let content = data.content;

  images.forEach((image) => {
    content = content.replace(image, '')
  });

  data.content = content;
}

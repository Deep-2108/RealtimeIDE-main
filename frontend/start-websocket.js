// import { WebSocketServer } from 'ws';

// const wss = new WebSocketServer({ port: 1234 });

// wss.on("connection", (ws) => {
//   console.log("A new client connected.");

//   ws.on("message", (message) => {
//     try {
//       const parsedMessage = JSON.parse(message);  // Parse JSON message
//       console.log("Received message:", parsedMessage);
//     } catch (error) {
//       console.log("Error parsing message:", error);
//       console.log("Raw message:", message);  // Log raw message if it's not valid JSON
//     }
//   });

//   ws.send("Welcome to the WebSocket server!");
// });

// console.log("WebSocket server is running on ws://localhost:1234");
// import { WebSocketServer } from 'ws';  // Ensure the correct import for ES modules

// // Create a WebSocket server listening on port 1234
// const wss = new WebSocketServer({ port: 1234 });

// // Event listener for when a new client connects
// wss.on("connection", (ws) => {
//   console.log("A new client connected.");

//   // Event listener for messages from the client
//   ws.on("message", (message) => {
//     console.log("Raw message received:", message);

//     // Check if the message is a Buffer (binary data)
//     if (Buffer.isBuffer(message)) {
//       console.log("Received binary data:", message);
//     } else {
//       // If the message is a string, we attempt to parse it as JSON
//       try {
//         const jsonData = JSON.parse(message);
//         console.log("Received JSON:", jsonData);
//       } catch (e) {
//         console.error("Error parsing message:", e);
//         // If JSON parsing fails, log the raw message to investigate further
//       }
//     }
//   });

//   // Send a welcome message to the new client
//   ws.send("Welcome to the WebSocket server!");
// });

// console.log("WebSocket server is running on ws://localhost:1234");
   

// import { WebSocketServer } from 'ws';

// const wss = new WebSocketServer({ port: 1234 });

// wss.on("connection", (ws) => {
//   console.log("A new client connected.");

//   ws.on("message", (message) => {
//     try {
//       const parsedMessage = JSON.parse(message);  // Parse JSON message
//       console.log("Received message:", parsedMessage);
//     } catch (error) {
//       console.log("Error parsing message:", error);
//       console.log("Raw message:", message);  // Log raw message if it's not valid JSON
//     }
//   });

//   ws.send("Welcome to the WebSocket server!");
// });

// console.log("WebSocket server is running on ws://localhost:1234");
import { WebSocketServer } from 'ws';  // Ensure the correct import for ES modules

// Create a WebSocket server listening on port 1234
const wss = new WebSocketServer({ port: 1234 });

// Event listener for when a new client connects
wss.on("connection", (ws) => {
  console.log("A new client connected.");

  // Event listener for messages from the client
  ws.on("message", (message) => {
    console.log("Raw message received:", message);

    // Check if the message is a Buffer (binary data)
    if (Buffer.isBuffer(message)) {
      console.log("Received binary data:", message);
    } else {
      // If the message is a string, we attempt to parse it as JSON
      try {
        const jsonData = JSON.parse(message);
        console.log("Received JSON:", jsonData);
      } catch (e) {
        console.error("Error parsing message:", e);
        // If JSON parsing fails, log the raw message to investigate further
      }
    }
  });

  // Send a welcome message to the new client
  ws.send("Welcome to the WebSocket server!");
});

console.log("WebSocket server is running on ws://localhost:1234");
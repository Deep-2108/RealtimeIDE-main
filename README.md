# Realtime Collaborative IDE

## Overview

Realtime Collaborative IDE is a web-based platform that lets users collaborate on code in real time with built-in AI assistance. The app uses WebRTC, WebSockets, and Yjs to synchronize code edits, while a responsive chatbot panel helps answer programming questions directly from the editor.

## Features

- Live code collaboration with shared editing
- Real-time synchronization using WebRTC and Yjs
- WebSocket fallback for connection reliability
- Monaco Editor for advanced code authoring
- User awareness and session sharing
- AI code assistant/chatbot panel with abortable requests and clear-to-initial state

## Technologies Used

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express
- Realtime synchronization: Yjs, y-webrtc, y-websocket
- Editor: Monaco Editor
- Database: MongoDB
- AI integration: Gemini via backend proxy route

## Local Setup

### Prerequisites

- Node.js (v18+)
- npm or yarn
- MongoDB (local or Atlas)
- A Gemini API key for the chatbot: `GEMINI_API_KEY`

### Clone and install

```sh
git clone https://github.com/Deep-2108/RealtimeIDE-main.git
cd RealtimeIDE
```

Install backend and frontend dependencies:

```sh
cd backend
npm install
cd ../frontend
npm install
```

Install the local y-webrtc signaling server dependencies too:

```sh
cd ../y-webrtc
npm install
```

### Configure environment variables

Create a `.env` file in `backend/` with at least:

```env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.5-flash
```

### Run the project

Start the signaling server:

```sh
cd y-webrtc
node bin/server.js
```

Start the backend:

```sh
cd ../../backend
node server.js
```

Start the frontend:

```sh
cd ../frontend
npm run dev
```

Open the app at `http://localhost:5173`

## Chatbot Usage

- The AI chat panel appears in the right-hand editor area.
- Click the chat bubble to expand it and ask questions about code, compiler errors, or project setup.
- The `Clear` button resets chat to the initial assistant welcome message.
- Use `Stop` while a request is in progress to abort the API call.
- An unread badge appears when new messages arrive while the panel is collapsed.

## Troubleshooting

### WebRTC not connecting

- Confirm the signaling server is running on port `4444`.
- Make sure the browser can connect to `http://localhost:4444`.

### Backend issues

- Ensure `backend/server.js` is running and `MONGO_URI` is valid.
- If port `5000` is already in use, stop the conflicting process or change the port.

### Port conflicts

```sh
npx kill-port 5000
```

Then restart the backend.

## Notes

- The project includes a local `y-webrtc` folder for the signaling server.
- The frontend connects to the backend at `http://localhost:5000` and the editor is served by Vite.

## Demo Video 🎥

Watch the project in action: [Click here to watch the demo](https://drive.google.com/file/d/1ciBFa_Z7OR2ZQu8mzn9M9skOcYJw5Xnb/view?usp=sharing)

Feel free to open issues and contribute! 🚀

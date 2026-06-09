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

- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- Realtime synchronization: Yjs, y-webrtc, y-websocket
- Editor: Monaco Editor
- Database: MongoDB
- AI integration: Gemini

## Local Setup

### Prerequisites

- Node.js (v18+)
- npm or yarn
- MongoDB (local or Atlas)
- A Gemini API key for the chatbot: `GEMINI_API_KEY`

### Clone and install

```sh
git clone https://github.com/Deep-2108/RealtimeIDE-main.git
cd RealtimeIDE-main
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

## How to Use

### 1. Access the app

- Open `http://localhost:5173` in your browser after starting the frontend.
- The homepage shows login/signup options. If you are not logged in, click **Signup** to create an account or **Login** if you already have one.
- Once logged in, use the **Editor Page** link to access the collaborative editor.

### 2. Use the file explorer

- The left sidebar is the **File Explorer**.
- Click **+** to create a new file and enter a file name.
- Click any file name to load its content into the editor.
- Use the item menu to **Rename**, **Delete**, or **Change Access** for a file.
- Files are fetched from the backend and require a valid login token.

### 3. Edit code collaboratively

- The central editor is a shared Monaco editor powered by **Yjs** and **y-webrtc**.
- Changes are synchronized in real time with other collaborators connected to the same file.
- The active users toolbar at the top shows other users currently editing the document.
- The editor auto-saves the active file every few seconds and also saves before navigating away.

### 4. Run code

- Use the **Run Code** button on the right panel to execute the current editor content.
- The app sends the code to the Piston execution API configured for C++ and displays the output below.
- The **Output** panel shows program output or any execution error returned by the runner.

### 5. Provide stdin

- Enter custom input in the **Stdin** section before running code.
- The input is passed to the running program and reflected in the output results.

### 6. Share and access control

- If you are the creator of the current file, the **Share File** section appears in the right panel.
- Enter a collaborator's email and click **Share** to grant access through the backend sharing endpoint.
- Shared file access is managed by the backend route `api/files/share`.

### 7. Use the AI chatbot

- The chatbot lives in the bottom-right panel as a floating bubble when collapsed.
- Click the bubble to expand the chat panel.
- Ask questions about code, compiler errors, project setup, or collaboration issues.
- Click **Send** to submit your query.
- If a request is running, click **Stop** to abort the API call.
- Click **Clear** to reset the chat to the initial assistant message.
- When the chat panel is collapsed, new assistant responses show an unread badge on the bubble.

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

Feel free to open issues and contribute! 🚀

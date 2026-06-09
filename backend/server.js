// backend/server.js
// backend/server.js

// Import required modules
// import express from "express"; // Import Express
// import dotenv from "dotenv"; // Import dotenv for environment variables
// import cors from "cors"; // Import cors for handling Cross-Origin Resource Sharing
// import bodyParser from "body-parser"; // Import body-parser to parse JSON payloads
// import connectDB from "./config/db.js"; // Import the database connection function
// import router from "./routes/auth.js";
// import userRouter from "./routes/user.js"
// import fileRouter from "./routes/file.js"
// // Load environment variables
// dotenv.config(); // This reads your .env file and loads the variables into process.env

// // Connect to MongoDB
// connectDB(); // Calls the function to connect to MongoDB using the connection string from your .env file

// // Initialize Express application
// const app = express();

// // Middlewares
// //app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173", credentials: true })); // Replace with your frontend's URL
//  // Enable CORS
//  app.use(cors({
//   origin: process.env.FRONTEND_URL || "http://localhost:5173", 
//   credentials: true,
//   methods: "GET,POST,PUT,DELETE" // Allowed HTTP methods
// }));

// app.use(bodyParser.json()); // Enable JSON parsing for incoming requests


// app.use("/api/auth", router)
// app.use("/api/users", userRouter)
// app.use("/api/files", fileRouter)
// // Example Routes (you can add real routes here)
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// // Start the server
// const PORT = process.env.PORT || 5000; // Define the port (default to 5000 if not in .env)
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
import express from "express"; // Import Express
import dotenv from "dotenv"; // Import dotenv for environment variables
import cors from "cors"; // Import cors for handling Cross-Origin Resource Sharing
import bodyParser from "body-parser"; // Import body-parser to parse JSON payloads
import connectDB from "./config/db.js"; // Import the database connection function
import router from "./routes/auth.js";
import userRouter from "./routes/user.js"
import fileRouter from "./routes/file.js"
import chatRouter from "./routes/chat.js";
// Load environment variables
dotenv.config(); // This reads your .env file and loads the variables into process.env

// Connect to MongoDB
connectDB(); // Calls the function to connect to MongoDB using the connection string from your .env file

// Initialize Express application
const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Replace with your frontend's URL
 // Enable CORS
app.use(bodyParser.json()); // Enable JSON parsing for incoming requests


app.use("/api/auth", router)
app.use("/api/users", userRouter)
app.use("/api/files", fileRouter)
app.use("/api/chat", chatRouter)
// Example Routes (you can add real routes here)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 5000; // Define the port (default to 5000 if not in .env)
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
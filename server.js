// Import necessary modules
const express = require("express");
const path = require("path");

// Create an Express application instance
const app = express();

// Set the port to listen on, either from the environment variable PORT or defaulting to 3001
const PORT = process.env.PORT || 3001;

// Require route modules for HTML routes (htmlRoutes.js) and API routes (apiRoutes.js)
const htmlRoutes = require("./routers/html_routes");
const apiRoutes = require("./routers/api_routes");

// Middleware to serve static files from the "public" directory
app.use(express.static("public"));

// Middleware to parse URL-encoded data and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Mount the route handlers defined in htmlRoutes.js and apiRoutes.js
app.use(htmlRoutes);
app.use(apiRoutes);

// Define a catch-all route to serve "index.html" for any other routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server, listening on the specified port
app.listen(PORT, () =>
  console.log(`App listening on http://localhost:${PORT}`)
);

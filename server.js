const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./configs/.env") });
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const morganMiddleware = require("./middlewares/morgan.middleware");
const socket = require("socket.io");
const DIST_DIR = path.join(__dirname, "./views/dist");
const HTML_FILE = path.join(DIST_DIR, "index.html");
const logger = require("./utils/logger");

app.use(express.json());
app.use(morganMiddleware);
app.use(require("./routes"));
app.use(express.static(DIST_DIR));

app.get("/api/status", (req, res) => {
  logger.info("Checking the API status: Everything is OK");
  res.status(200).send({
    status: "UP",
    message: "The API is up and running!",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});
require("dotenv").config();
const dbConnect = require("./Config/dbconnect");
const apiv1Router = require("./Routes/index");
const errorCatching = require("./Middleware/errorCatching");
const PORT = process.env.PORT || 3000;
const fileupload = require("express-fileupload");
const cloudinary = require("./Config/cloudinary");
io.on("connection", (socket) => {
  console.log("A user connected");
});
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(express.json());
app.use(cors());
app.use("/api/v1", apiv1Router);
app.get("/", (req, res) => {
  res.status(200).json({ message: "The backend is up and running" });
});
// app.use(errorCatching);

// Connecting with Cloudinary
cloudinary.cloudinaryConnect();

server.listen(PORT, () => console.log(`Backend is running @${PORT}`));
dbConnect();

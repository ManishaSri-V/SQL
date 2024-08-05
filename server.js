const express = require("express"); // npm install express

var cors = require("cors");

const authRoute = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const activityRoutes = require("./routes/activityRoutes");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

const port = 3030;

app.use("/api/auth", authRoute);
app.use("/api/user", userRoutes);
app.use("/api/activity", activityRoutes);

// listen on port 3030 and start my server
app.listen(port, () => {
  console.log("My server has started on the port " + port);
});

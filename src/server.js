require("dotenv").config();
const express = require("express");
const proxy = require("express-http-proxy");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const authMiddleware = require("./middleware/auth-middleware");
const designRoutes = require("./routes/design-routes");
const subscriptionRoutes = require("./routes/subscription-routes");
const mediaRoutes = require("./routes/upload-routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("Connected to MongoDB"))
.catch((error) => console.log("MongoDB Error", error));


app.use("/designs", authMiddleware, designRoutes);
app.use("/subscription", authMiddleware, subscriptionRoutes);
app.use("/media", authMiddleware,  mediaRoutes);


async function startServer() {
    try {
      app.listen(PORT, () =>
        console.log(`Service running on port ${PORT}`)
      );
    } catch (error) {
      console.error("Failed to connected to server", error);
      process.exit(1);
    }
}
  
  startServer();
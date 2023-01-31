import express from "express";
import config from "./config";

import packagesRoutes from "./routes/packages.routes";

const app = express();

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

let port;
// settings
app.set("port", config.port);

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(packagesRoutes);

export default app;

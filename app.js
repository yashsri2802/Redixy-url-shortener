import express from "express";
import { shortenedRoutes } from "./routes/shortener.routes.js";
import { connectDB } from "./config/db-client.js";
import { env } from "./config/env.js";

const app = express();

const PORT = env.PORT;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(shortenedRoutes);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});

import express from "express";
import { shortenedRoutes } from "./routes/shortener.routes.js";

const app = express();

const PORT = process.env.PORT;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(shortenedRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

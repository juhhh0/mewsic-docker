import express from "express";
import tracksRoutes from "./routes/tracksRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import playlistsRoutes from "./routes/playlistsRoutes.js";
import cors from "cors";
import 'dotenv/config'

const app = express();

app.use(cors());
app.use(express.json({ limit: "10MB" }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/tracks", tracksRoutes);
app.use("/api/playlists", playlistsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/search", searchRoutes);

app.listen(3000, () => {
  console.log("running on port 3000 !!!!!!!!!")
});

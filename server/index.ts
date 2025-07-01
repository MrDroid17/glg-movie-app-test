import express, { Request, Response } from "express";
import path from "path";
import cors from "cors";
import { server } from "./mocks/node";
import dotenv from "dotenv";
dotenv.config();
// dotenv.config({ path: path.resolve(__dirname, "../.env") });
import { MediaRouter } from "./controllers/media/MediaRouter";


if (process.env.VITE_MOCK_RESULTS === "true") {
  server.listen();
}

const app = express();
const port = process.env.API_PORT;

app.use(cors({ origin: "http://localhost:3000" }));

app.use(express.static(path.join(__dirname, "../build")));

const httpInstance = app.listen(port, function () {
  console.log("server running on port:", port);
});

app.use("/api/media", new MediaRouter().getRouter());

app.get("/", async (req: Request, res: Response) => {
  res.status(200).send("Hello");
});

const exitEvents = ["SIGINT", "SIGHUP", "SIGTERM", "SIGUSR1", "SIGUSR2"];
exitEvents.forEach((event) => {
  process.on(event, () => {
    httpInstance.close();
    console.log("Graceful shutdown.");
    process.exit(0);
  });
});

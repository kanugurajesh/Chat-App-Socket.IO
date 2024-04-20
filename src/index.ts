import express, { Express, Request, Response } from "express";
import { createServer } from "node:http";
import path, { join } from "node:path";
import { Server } from "socket.io";

const app: Express = express();
const port = process.env.PORT || 3000;
const server = createServer(app);
const io = new Server(server);

let currentDir = path.dirname(module.filename)
let words = currentDir.split('\\')
words.pop();
currentDir = words.join("\\")

app.get("/", (req: Request, res: Response) => {
  res.sendFile(join(currentDir, 'index.html'));
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  })
})

server.listen(3000, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
})
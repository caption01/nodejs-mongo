const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("There was new sale");
});

myEmitter.on("newSale", () => {
  console.log("Costumer name: Jonas");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} Item left`);
});

myEmitter.emit("newSale", 9);

////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request recieve 1");
  res.end("Request recieved");
});

server.on("request", (req, res) => {
  console.log("Request recieve 2");
});

server.on("close", (req, res) => {
  console.log("Server close");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("server is running");
});

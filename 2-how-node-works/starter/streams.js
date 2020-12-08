const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // solution 1
  // fs.readFile("test-file.txt", (err, data) => {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   res.end(data);
  // });
  // solution 2 : stream
  // const readable = fs.createReadStream("testaa-file.txt");
  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on("end", () => {
  //   res.end();
  // });
  // readable.on("error", (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("File not found");
  // });
  // solution 3 : pipe
  const readable = fs.createReadStream("test-file.txt");

  readable.pipe(res);
  //readable
});

server.listen(8000, "localhost", () => {
  console.log("server is running");
});

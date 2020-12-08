const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 2;

setTimeout(() => console.log("timer 1"), 0);
setImmediate(() => console.log("Immediate 1"));

fs.readFile("test-file.txt", () => {
  console.log("I/o task");
  console.log("----------");

  setTimeout(() => console.log("timer 2"), 0);
  setTimeout(() => console.log("timer 3"), 3000);
  setImmediate(() => console.log("Immediate 2"));

  process.nextTick(() => {
    console.log("Process next tick");
  });

  crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });

  crypto.pbkdf2("password", "salt", 10000, 1024, "sha512", () => {
    console.log(Date.now() - start, "Password encrypted");
  });
});

console.log("Hello top level code");

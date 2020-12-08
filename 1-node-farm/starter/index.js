const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemp = require("./module/replaceTemp");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardsHtml = dataObject
      .map((el) => replaceTemp(tempCard, el))
      .join("");

    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);

    res.end(output);
  }

  // product page
  if (pathname === "/product") {
    const product = dataObject[query.id];
    const output = replaceTemp(tempProduct, product);

    res.writeHead(200, {
      "Content-type": "text/html",
    });

    res.end(output);
  }

  res.end("Hello from server");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("server is running");
});

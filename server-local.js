var http = require("http");
// import fetch from 'node-fetch';
http
  .createServer(function (req, res) {
    // Homepage
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("Welcome to the homepage!");
    }

    // About page
    else if (req.url === "/about") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("Welcome to the about page!");
    }

    // 404'd!
    else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 error! File not found.");
    }
  })
  .listen(1337, "localhost");

const fetch = require("node-fetch");
const API_ENDPOINT = "https://stadium-football-fans-services.netlify.app/facts";

exports.handler = async (event, context) => {
  try {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed fetching data",
      }),
    };
  }
};

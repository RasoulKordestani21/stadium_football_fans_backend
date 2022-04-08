// const express = require('express')
// const app = express()

// let people = [
//     {
//       name: "Hannah Rickard",
//       number: "06-51-99-56-83",
//       id: 1
//     },
//     {
//       name: "Hyun Namkoong",
//       number: "10987654",
//       id: 2
//     },
//     {
//       name: "Courtney Martinez",
//       number: "3691215",
//       id: 3
//     }
//   ]

//   app.get('/', (request, response) => {
//       response.send('<h1>Phonebook</h1>')
//   })

//   app.get('/api/people', (request, response) => {
//       response.json(people)
//   })

//   const PORT = 3001
//   app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`)
//   })

'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
const express = require('express');
const app = express();
const DB = require('./database.js');

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public_og'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetLifts
apiRouter.get('/lifts', async (_req, res) => {
  const lifts = await DB.getLifts();
  res.send(lifts);
});

// SubmitLifts
apiRouter.post('/lifts', async (req, res) => {
  DB.addLift(req.body)
  const lifts = await DB.getLifts();
  res.send(lifts);
});


// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

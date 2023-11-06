const express = require('express');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetLifts
apiRouter.get('/lifts', (_req, res) => {
  res.send(lifts);
});

// SubmitLifts
apiRouter.post('/lifts', (req, res) => {
  const newLift = req.body.lift;
  const targetUser = req.body.user;
  const targetLifts = lifts.find((entry) => entry.user === targetUser);

  if (targetLifts) {
    targetLifts.lifts.push(newLift);
  } else {
    lifts.push({ user: targetUser, lifts: [newLift] });
  }

  // Send the response once after updating the data
  res.send(lifts);
});


// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

let lifts = [
  {
    user: 'Bob',
    lifts: [
      { date: '2021-01-01', lifts: { squat: 100, bench: 100, deadlift: 100 } },
      { date: '2021-01-02', lifts: { squat: 200, bench: 200, deadlift: 200 } },
    ],
  },
  {
    user: 'Billy',
    lifts: [
      { date: '2021-01-03', lifts: { squat: 300, bench: 300, deadlift: 300 } },
    ],
  },
];


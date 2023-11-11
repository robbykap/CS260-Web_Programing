const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const liftCollection = db.collection('lifts');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function addLift(req) {

  const newLift = req.lift;
  const targetUser = req.user;

  const targetLifts = await liftCollection.findOne({ user: targetUser });

  if (targetLifts) {
    // If the user exists, push the new lift
    await liftCollection.updateOne({ user: targetUser }, { $push: { lifts: newLift } });
  } else {
    // If the user does not exist, insert a new document
    await liftCollection.insertOne({ user: targetUser, lifts: [newLift] });
  }
}

function getLifts() {
  return liftCollection.find().toArray();
}

module.exports = { addLift, getLifts };

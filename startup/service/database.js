const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const liftCollection = db.collection('lifts');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUsername(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, username, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    username: username,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

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

module.exports = { addLift, getLifts, getUser, getUsername, getUserByToken, createUser };

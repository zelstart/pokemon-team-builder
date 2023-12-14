const mongodb = require('mongodb');

let uri = process.env.ATLAS_URI;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await mongodb.MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  cachedDb = client.db('pokemon-team-builder');
  return cachedDb;
}

exports.handler = async (event, context) => {
  const db = await connectToDatabase();
  const collection = db.collection('pokemon-teams');

};
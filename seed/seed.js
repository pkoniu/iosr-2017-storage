const MongoClient = require('mongodb').MongoClient;
const argv = require('minimist')(process.argv.slice(2));

const seedData = require('./storage-items.json');

const {
    MONGODB_URI = argv.mongodb_uri,
    MONGO_HOST = 'localhost',
    MONGO_PORT = '27017',
    DB_NAME = 'iosr2017-storage'
} = process.env;

const mongoUrl = createMongoUrl();

const insertItems = db => {
    console.log(`Connected to ${DB_NAME}.`);
    console.log(`Inserting ${seedData.length} storage items.`);
    return db.collection('storage-items').insertMany(seedData);
};

const actAfterInsert = result => {
    console.log(`Inserted ${result.insertedCount} storage items.`);
    return process.exit(0);
};

const actOnError = error => {
    console.log(`Couldn't finish seeding: ${error}`);
    return process.exit(1);
};

return MongoClient.connect(mongoUrl)
    .then(insertItems)
    .then(actAfterInsert)
    .catch(actOnError);

function createMongoUrl() {
    const customUrl = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${DB_NAME}`
    return MONGODB_URI || customUrl;
}

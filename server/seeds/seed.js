const db = require('../config/connection');
const Test = require('../models');
const testSeeds = require('./testSeeds.json');

db.once('open', async () => {
    console.log(testSeeds);
  
    try {
        await Test.deleteMany({});
        await Test.insertMany(testSeeds);

        console.log('all done!');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
    process.exit(0);
});

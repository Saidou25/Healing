const mongoose = require('mongoose');
// require("dotenv").config();

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/healing',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => {
    console.log('connected to MongoDB...');
  })
  .catch((err) => {
    console.log(err);
  });
  

module.exports = mongoose.connection;

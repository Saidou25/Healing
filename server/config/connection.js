const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/healing',
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

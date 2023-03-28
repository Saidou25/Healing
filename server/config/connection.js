const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/Healing',
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

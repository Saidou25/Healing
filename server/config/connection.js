const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 3001,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;

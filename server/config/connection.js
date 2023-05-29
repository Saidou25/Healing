const mongoose = require('mongoose');
// require("dotenv").config();

mongoose.connect(
<<<<<<< HEAD
  process.env.MONGODB_URI || 'mongodb://localhost/healing',
=======
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/healing',
>>>>>>> cd06d6662d7c6264ac8ecd18f04b66aaf409baaa
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
module.exports = mongoose.connection;

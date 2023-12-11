const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pokemon-teams', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
});

module.exports = mongoose.connection;


// const mongoose = require('mongoose');

// const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pokemon-teams';
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, ssl: true });

// module.exports = mongoose.connection;
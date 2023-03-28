const Test = require('../models');

const resolvers = {
    Query: {
        tests: async () => {
            return await Test.find({});
        }
    }
};

module.exports = resolvers;
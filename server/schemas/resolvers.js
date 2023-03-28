const Patient = require('../models');

const resolvers = {
    Query: {
        patients: async () => {
            return await Patient.find({});
        },
        patient: async (_, args) => {
            return await Patient.findOne({ _id: args.id });
        }
    },

    Mutation: {
        addPatient: async (_, args) => {
            const patient = await Patient.create(args);
            return { patient };
        }
    }
};

module.exports = resolvers;
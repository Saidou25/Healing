const Patient = require('../models');

const resolvers = {
    Query: {
        patients: async () => {
            return await Patient.find();
        },
        patient: async (_, args) => {
            return await Patient.findOne({ _id: args.id });
        }
    },

    Mutation: {
        addPatient: async (_, args) => {
            console.log('patientname', args.patientname, 'age', args.age);
     
            return await Patient.create({ patientname: args.patientname, age: args.age });
        },
    },
};

module.exports = resolvers;
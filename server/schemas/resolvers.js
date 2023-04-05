const { Patient, Date } = require('../models');

const resolvers = {
    Query: {
        patients: async () => {
            return await Patient.find({});
        },
        patient: async (_, args) => {
            return await Patient.findOne({ _id: args.id });
        },
        dates: async () => {
            return await Date.find({});
        },
        date: async (_, args) => {
            return await Date.findOne({ _id: args.id });
        },
    },

    Mutation: {
        addPatient: async (_, args) => {
            console.log('patientname', args.patientname, 'age', args.age);
     
            return await Patient.create({ patientname: args.patientname, age: args.age });
        },
        addDate: async (_, args) => {
            console.log('date', args.date);
     
            return await Date.create({ date: args.date });
        },
    },
};

module.exports = resolvers;
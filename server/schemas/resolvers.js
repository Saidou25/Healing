const { Patient, Date, Bookingdate } = require('../models');

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
        bookingdate: async () => {
            return await Bookingdate.find({});
        },
        bookingdate: async (_, args) => {
            return await Bookingdate.findOne({ _id: args.id });
        },
    },

    Mutation: {
        addPatient: async (_, args) => {
            
              return await Patient.create({ 
                patientfirstname: args.patientfirstname, 
                patientlastname: args.patientlastname, 
                birthdate: args.birthdate, 
                patientemail: args.patientemail,
                patientcity: args.patientcity,
                patientzip: args.patientzip,
                patientnumber: args.patientnumber,
                patientreason: args.patientreason,
                patientaddress: args.patientaddress,
                patientgender: args.patientgender,
                mepet: args.mepet
             });
        },
        addDate: async (_, args) => {
            console.log('startDate', args.startDate);
     
            return await Date.create({ 
                startDate: args.startDate,
                patientfirstname: args.patientfirstname, 
                patientlastname: args.patientlastname, 
                birthdate: args.birthdate, 
                patientemail: args.patientemail,
                patientcity: args.patientcity,
                patientzip: args.patientzip,
                patientnumber: args.patientnumber,
                patientreason: args.patientreason,
                patientaddress: args.patientaddress,
                patientgender: args.patientgender,
                mepet: args.mepet });
        },
        addBookingdate: async (_, args) => {
            console.log('startDate', args.startDate);
     
            return await Bookingdate.create({ 
                startDate: args.startDate,
                });
        },
    },
};

module.exports = resolvers;
const { Patient, Visitorappointment, Bookingdate, Pet, Petappointment } = require('../models');

const resolvers = {
    Query: {
        patients: async () => {
            return await Patient.find({});
        },
        patient: async (_, args) => {
            return await Patient.findOne({ _id: args.id });
        },
        visitorappointments: async () => {
            return await Visitorappointment.find({});
        },
        visitorappointment: async (_, args) => {
            return await Visitorappointment.findOne({ _id: args.id });
        },
        bookingdates: async () => {
            return await Bookingdate.find({});
        },
        bookingdate: async (_, args) => {
            return await Bookingdate.findOne({ _id: args.id });
        },
        pets: async () => {
            return await Pet.find({});
        },
        pet: async (_, args) => {
            return await Pet.findOne({ _id: args.id });
        },
        petappointments: async () => {
            return await Petappointment.find({});
        },
        petappointment: async (_, args) => {
            return await Petappointment.findOne({ _id: args.id });
        }
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
        addVisitorappointment: async (_, args) => {

            return await Visitorappointment.create({
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
                mepet: args.mepet,
                isBooked: args.isBooked,
                finalDateISO: args.finalDateISO,
                appDay: args.appDay,
                appMonth: args.appMonth,
                appDate: args.appDate,
                appTime: args.appTime,
                appYear: args.appYear,
                appointment: args.appointment
            });
        },
        addBookingdate: async (_, args) => {

            return await Bookingdate.create({
                isBooked: args.isBooked,
                finalDateISO: args.finalDateISO,
                appDay: args.appDay,
                appMonth: args.appMonth,
                appDate: args.appDate,
                appTime: args.appTime,
                appYear: args.appYear
            });
        },
        addPet: async (_, args) => {

            return await Pet.create({
                petName: args.petName,
                petWeight: args.petWeight,
                petAge: args.petAge,
                petGender: args.petGender,
                petReason: args.petReason,
                petBreed: args.petBreed
            })
        },
        addPetappointment: async (_, args) => {

            return await Petappointment.create({
                petName: args.petName,
                petWeight: args.petWeight,
                petAge: args.petAge,
                petGender: args.petGender,
                petReason: args.petReason,
                petBreed: args.petBreed,
                patientgender: args.patientgender,
                patientfirstname: args.patientfirstname,
                patientlastname: args.patientlastname,
                patientaddress: args.patientaddress,
                patientzip: args.patientzip,
                patientcity: args.patientcity,
                patientnumber: args.patientnumber,
                patientreason:args. patientreason,
                patientemail: args.patientemail,
                isBooked: args.isBooked,
                finalDateISO: args.finalDateISO,
                appDay: args.appDay,
                appMonth: args.appMonth,
                appDate: args.appDate,
                appTime: args.appTime,
                appointment: args.appointment,
                appYear: args.appYear,
            })
        }
    },
};

module.exports = resolvers;
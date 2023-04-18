const { Patient, Visitorappointment, Bookingdate, Pet, Petappointment, User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        user: async (_, args) => {
            return User.findOne({ _id: args.id });
        },
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
        addUser: async (_, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (_, { email, username, password }) => {
            const user = await User.findOne(email ? { email } : { username});
           
            if (!user) {
                throw new AuthenticationError('No user with this email found!');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }
            const token = signToken(user);
            return { token, user };
        },

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

            return await addVisitorappointment.create({
                user: args.user,
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
                patientreason: args.patientreason,
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
        },
    },
};

module.exports = resolvers;
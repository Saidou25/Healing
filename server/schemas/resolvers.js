const { Visitorappointment, Bookingdate, User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('visitorappointments');
        },
        user: async (_, args) => {
            return User.findOne({ username: args.username }).populate('visitorappointments');
        },
        me: async (_, _args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('visitorappointments');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        visitorappointments: async (_, args) => {
            const username = args.username;
            const params = username ? { username } : {}
            return await Visitorappointment.find(params);
        },
        visitorappointment: async (_, args) => {
            return await Visitorappointment.findOne({ _id: args._id });
        },
        userVisitorappointments: async (_, args, context) => {
            return Visitorappointment.find({ user: context.user._id })
        },
        bookingdates: async () => {
            // const username = args.username;
            // const params = username ? { username } : {}
            return Bookingdate.find({});
        },
        bookingdate: async (_, args) => {
            return await Bookingdate.findOne({ _id: args._id });
        },
        userBookingdates: async (_, _args, context) => {
            return Bookingdate.find({ user: context.user._id });
        }
    },

    Mutation: {
        addUser: async (_, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (_, { email, username, password }) => {
            const user = await User.findOne(email ? { email } : { username });

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

        addBookingdate: async (_, args, context) => {
            if (context.user) {
                const bookingdate = await Bookingdate.create({
                    isBooked: args.isBooked,
                    finalDateISO: args.finalDateISO,
                    appDay: args.appDay,
                    appMonth: args.appMonth,
                    appDate: args.appDate,
                    appTime: args.appTime,
                    appYear: args.appYear
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { bookingdates: bookingdate._id } }
                );

                return bookingdate;
            }
            throw new AuthenticationError('You need to be logged in!');

        },

        addVisitorappointment: async (_, args, context) => {
            if (context.user) {
                const visitorappointment = await Visitorappointment.create({
                    patientfirstname: args.patientfirstname,
                    patientlastname: args.patientlastname,
                    birthdate: args.birthdate,
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
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { visitorappointments: visitorappointment._id } },
                    { new: true }
                )
                return visitorappointment;
            }
            throw new AuthenticationError('You need to be logged in!');

        },
        deleteUser: async (_, args) => {
            return await User.findOneAndDelete({ username: args.username });

        },
        deleteVisitorappointment: async (_, args) => {
            return await Visitorappointment.findOneAndDelete({ id: args._id })
        }
    }
};

module.exports = resolvers;
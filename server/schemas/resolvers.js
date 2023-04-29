const { Profile, Bookingdate, User, Review } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('profiles').populate('bookingdates').populate('reviews');
        },
        user: async (_, args) => {
            return User.findOne({ username: args.username }).populate('profiles').populate('bookingdates').populate('reviews');
        },
        me: async (_, _args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('profiles').populate('bookingdates').populate('reviews');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        profiles: async () => {

            return await Profile.find();
        },
        profile: async (_, args) => {
            return await Profile.findOne({ _id: args.id });
        },

        bookingdates: async () => {
            return Bookingdate.find({});
        },
        bookingdate: async (_, args) => {
            return await Bookingdate.findOne({ _id: args._id });
        },
        reviews: async () => {
            return Review.find({});
        },
        review: async (_, args) => {
            return await Review.findOne({ _id: args._id });
        },
        userbookingdates: async (_, args) => {
            return Bookingdate.find({ username: args.username });
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
                    username: args.username,
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
                    { $addToSet: { bookingdates: bookingdate._id } },
                    { new: true }
                );

                return bookingdate;
            }
            throw new AuthenticationError('You need to be logged in!');

        },

        addProfile: async (_, args, context) => {
            if (context.user) {
                const profile = await Profile.create({
                    patientfirstname: args.patientfirstname,
                    patientlastname: args.patientlastname,
                    birthdate: args.birthdate,
                    patientcity: args.patientcity,
                    patientzip: args.patientzip,
                    patientState: args.patientState,
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
                    { $addToSet: { profiles: profile._id } },
                    { new: true }
                )
                return profile;
            }
            throw new AuthenticationError('You need to be logged in!');

        },
        addReview: async (_, args, context) => {
            if (context.user) {
                const review = await Review.create({
                    username: args.username,
                    reviewText: args.reviewText,
                    title: args.title
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { reviews: review._id } },
                    { new: true }
                );

                return review;
            }
            throw new AuthenticationError('You need to be logged in!');

        },
        deleteReview: async (_, args) => {
            return await Review.findOneAndDelete({ _id: args.id});
        },
        deleteUser: async (_, args) => {
            return await User.findOneAndDelete({ _id: args.id });

        },
        deleteBookingdate: async (_, args) => {
            return await Bookingdate.findOneAndDelete({ _id: args.id });

        },
        deleteProfile: async (_, args) => {
            return await Profile.findOneAndDelete({ id: args._id });
        }
    }
};

module.exports = resolvers;
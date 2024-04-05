const { Profile, Bookingdate, User, Review } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find()
        .populate("profile")
        .populate("bookingdates")
        .populate("reviews")
    },
    user: async (_, args) => {
      return await User.findOne({ id: args._id })
        .populate("profile")
        .populate("bookingdates")
        .populate("reviews")
    },
    me: async (_, _args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id })
          .populate("profile")
          .populate("bookingdates")
          .populate("reviews")
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    profiles: async () => {
      return await Profile.find();
    },
    profile: async (_, args) => {
      return await Profile.findOne({ _id: args.id });
    },
    bookingdates: async () => {
      return await Bookingdate.find();
    },
    bookingdate: async (_, args) => {
      return await Bookingdate.findOne({ _id: args.id });
    },
    reviews: async () => {
      return await Review.find();
    },
    review: async (_, args) => {
      return await Review.findOne({ _id: args.id });
    },
    userbookingdates: async (_, args) => {
      return await Bookingdate.find({ username: args.username });
    },
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
        throw new AuthenticationError("No user with this email found!");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }
      const token = signToken(user);
      return { token, user };
    },
    addBookingdate: async (_, args, context) => {
      if (context.user) {
        const bookingdate = await Bookingdate.create({
          username: args.username,
          startDate: args.startDate,
          digitalAppointment: args.digitalAppointment,
          appointmentString: args.appointmentString,
          reason: args.reason,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { bookingdates: bookingdate._id } },
          { new: true }
        );
        return bookingdate;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
   
    addProfile: async (_, args, context) => {
      if (context.user) {
        const profile = await Profile.create({
          username: args.username,
          patientfirstname: args.patientfirstname,
          patientlastname: args.patientlastname,
          birthdate: args.birthdate,
          patientcity: args.patientcity,
          patientzip: args.patientzip,
          patientState: args.patientState,
          patientnumber: args.patientnumber,
          patientaddress: args.patientaddress,
          patientgender: args.patientgender,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { profile: profile._id } },
          { new: true }
        );
        return profile;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addReview: async (_, args, context) => {
      if (context.user) {
        const review = await Review.create({
          username: args.username,
          reviewText: args.reviewText,
          title: args.title,
          rating: args.rating,
          reviewDate: args.reviewDate,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { reviews: review._id } },
          { new: true }
        );
        return review;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateProfile: async (_, args) => {
      return await Profile.findOneAndUpdate(
        { _id: args.id },
        {
          username: args.username,
          patientlastname: args.patientlastname,
          patientfirstname: args.  patientfirstname,
          patientcity: args.patientcity,
          patientzip: args.patientzip,
          patientState: args.patientState,
          patientnumber: args.patientnumber,
          patientaddress: args.patientaddress,
        },
        { new: true }
      );
    },
    deleteReview: async (_, args, context) => {
      if (context.user) {
        const review = await Review.findOneAndDelete({ _id: args.id });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { reviews: review._id } }
        );
        return review;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteBookingdate: async (_, args, context) => {
      if (context.user) {
        const bookingdate = await Bookingdate.findOneAndDelete({
          _id: args.id,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { bookingdates: bookingdate._id } }
        );
        return bookingdate;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteUser: async (_, args) => {
      return await User.findOneAndDelete({ _id: args.id });
    },
    deleteProfile: async (_, args) => {
      return await Profile.findOneAndDelete({ id: args._id });
    },
  },
};

module.exports = resolvers;

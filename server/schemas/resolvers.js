const { Profile, Bookingdate, User, Review, Pet } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
        .populate("profile")
        .populate("bookingdates")
        .populate("reviews")
        .populate({
          path: "profile",
          populate: "pets",
        });
    },
    user: async (_, args) => {
      return User.findOne({ id: args._id })
        .populate("profile")
        .populate("bookingdates")
        .populate("reviews")
        .populate({
          path: "profile",
          populate: "pets",
        });
    },
    me: async (_, _args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate("profile")
          .populate("bookingdates")
          .populate("reviews")
          .populate({
            path: "profile",
            populate: "pets",
          });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    profiles: async () => {
      return await Profile.find().populate("pets");
    },
    profile: async (_, args) => {
      return await Profile.findOne({ _id: args.id });
    },
    pets: async () => {
      return await Pet.find();
    },
    pet: async (_, args) => {
      return await Pet.findOne({ username: args.uername });
    },
    bookingdates: async () => {
      return Bookingdate.find();
    },
    bookingdate: async (_, args) => {
      return await Bookingdate.findOne({ _id: args.id });
    },
    reviews: async () => {
      return Review.find();
    },
    review: async (_, args) => {
      return await Review.findOne({ _id: args.id });
    },
    userbookingdates: async (_, args) => {
      return Bookingdate.find({ username: args.username });
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
    addPet: async (_, args) => {
      const pet = await Pet.create({
        profileId: args.profileId,
        username: args.username,
        petName: args.petName,
        petGender: args.petGender,
        petAge: args.petAge,
        petKind: args.petKind,
        petBreed: args.petBreed,
        petWeight: args.petWeight,
      });
      await Profile.findOneAndUpdate(
        { _id: args.profileId },
        { $addToSet: { pets: pet } },
        { new: true }
      );
      return pet;
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
          mepet: args.mepet,
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
    deletePet: async (_, args) => {
      return await Pet.findOneAndDelete({ username: args.username });
    },
  },
};

module.exports = resolvers;

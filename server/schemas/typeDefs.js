const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Profile {
    _id: ID!
    user: User
    username: String
    patientfirstname: String
    patientgender: String
    patientaddress: String
    patientemail: String
    patientlastname: String
    patientcity: String
    patientnumber: String
    patientState: String
    birthdate: String
    patientzip: String
    mepet: String
    pets: [Pet]
  }

  type Review {
    _id: ID!
    username: String
    reviewText: String
    title: String
    rating: String
    reviewDate: String!
  }

  type Pet {
    _id: ID!
    username: String!
    petBreed: String
    petName: String
    petWeight: Int
    petGender: String
    petAge: String
    petKind: String
    profileId: String
  }

  type Bookingdate {
    _id: ID!
    username: String
    startDate: String!
    digitalAppointment: String!
    appointmentString: String!
    reason: String!
  }

  type User {
    _id: ID!
    email: String
    password: String
    username: String
    profile: Profile
    reviews: [Review]
    bookingdates: [Bookingdate]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(id: String!): User
    me: User
    profiles: [Profile]
    profile(profileId: String!): Profile
    bookingdates: [Bookingdate]
    bookingdate(id: String!): Bookingdate
    reviews: [Review]
    review(id: String!): Review
    userbookingdates(username: String): [Bookingdate]!
    pets: [Pet]
    pet(username: String!): Pet
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String, password: String): Auth

    addProfile(
      username: String
      patientfirstname: String
      patientState: String
      patientgender: String
      patientaddress: String
      patientemail: String
      patientlastname: String
      patientcity: String
      patientnumber: String
      birthdate: String
      patientzip: String
      mepet: String
    ): Profile

    addBookingdate(
      username: String
      startDate: String!
      digitalAppointment: String!
      appointmentString: String!
      reason: String!
    ): Bookingdate

    addReview(
      username: String
      reviewText: String!
      title: String!
      rating: String
      reviewDate: String!
    ): Review

    addPet(
      username: String!
      profileId: String
      petBreed: String!
      petName: String!
      petWeight: Int!
      petGender: String!
      petKind: String
      petAge: String!
    ): Pet

    updateProfile(
      id: String
      username: String
      patientfirstname: String
      patientlastname: String
      patientcity: String
      patientzip: String
      patientState: String
      patientnumber: String!
      patientaddress: String
    ): Profile

    deleteUser(id: String!): User
    deleteProfile(id: String!): Profile
    deleteReview(id: String!): Review
    deleteBookingdate(id: String!): Bookingdate
    deletePet(username: String!): Pet
  }
`;

module.exports = typeDefs;

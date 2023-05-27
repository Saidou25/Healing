const { gql } = require('apollo-server-express');

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
     patientreason: String
     birthdate: String
     patientzip: String
     mepet: String
     isBooked: String
     appDay: String
     appMonth: String
     appDate: Int
     appTime: String
     appYear: Int
     appointment: String
     pets: [Pet]
     },
   
     type Review {
      _id: ID!
      username: String
     reviewText: String
     title: String
     }, 
     
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
     type Note {
      _id: ID!
     noteTitle: String
     numbers: [Number]
     }, 
    type Number {
       _id: ID!
       num: String
       }

     type Bookingdate1 {
      _id: ID!
      username: String
      digitMonth: String
      digitalAppointment: String
      isBooked: String
      finalDateISO: String
      appDay: String
     appMonth: String
     reason: String
     appDate: Int
     appTime: String
     appYear: Int
     }, 
     type User {
    _id: ID!
    email: String
    password: String 
    username: String
    note: Note
    profile: Profile 
    reviews: [Review]
    bookingdates: [Bookingdate1] 
  },
  type Auth {
    token: ID!
    user: User
  },
     
     type Query {
     users: [User]
     user(id: String!): User
     me: User
     profiles: [Profile]
     profile(profileId: String!): Profile
     bookingdates: [Bookingdate1]
     bookingdate(id: String): Bookingdate1
     reviews: [Review]
     review(id: String): Review
     userbookingdates(username: String): [Bookingdate]  
     notes: [Note]!
     note(id: String!): Note
     pets: [Pet]
     pet(username: String!): Pet
     numbers: [Number]
     number(id: String): Number
     
     },

     type Mutation {
    
     addUser(username: String!, email: String!, password: String!): Auth
     login(email: String, password: String): Auth

     addProfile(
     username: String!,
     patientfirstname: String!,
     patientState: String!,
     patientgender: String,
     patientaddress: String!,
     patientemail: String,
     patientlastname: String!,
     patientcity: String!,
     patientnumber: String!,
     patientreason: String,
     birthdate: String,
     patientzip: String!,
     mepet: String,
     isBooked: String,
     appDay: String,
     appMonth: String,
     appDate: Int,
     appointment: String,
     appTime: String,
     appYear: Int): Profile

     addBookingdate(
     username: String
     isBooked: String
     digitMonth: String
     finalDateISO: String
     appDay: String
     appMonth: String
     digitalAppointment: String
     appDate: Int
     appTime: String
     reason: String
     appYear: Int
     ): Bookingdate1

     addReview(
     username: String
     reviewText: String
     title: String
     ): Review

  
    addNote(id: String, noteTitle: String): Note
    updateNote(id: String, noteTitle: String): Note

    addPet(
    username: String!
    profileId: String
     petBreed: String
     petName: String
     petWeight: Int
     petGender: String
     petKind: String
     petAge: String
     ): Pet

    updateProfile(
    id: String,
    username: String,
     patientlastname: String, 
                    patientcity: String,
                    patientzip: String,
                    patientState: String,
                    patientnumber: String,
                    patientaddress: String): Profile
                    
    deleteNote(id: String): Note
    deleteUser(id: String!): User
    deleteProfile(id: String!): Profile
    deleteReview(id: String!): Review
    deleteBookingdate(id: String!): Bookingdate1
    deletePet(username: String!): Pet
     }
     `;

module.exports = typeDefs;
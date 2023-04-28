const { gql } = require('apollo-server-express');

const typeDefs = gql`
 
     type Profile {
     _id: ID!
     user: User
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
     patientzip: Int
     mepet: String
     isBooked: String
     finalDateISO: String
     appDay: String
     appMonth: String
     appDate: Int
     appTime: String
     appYear: Int
     appointment: String
     },
   

     type Bookingdate {
      _id: ID!
      username: String
      isBooked: String
      finalDateISO: String
      appDay: String
     appMonth: String
     appDate: Int
     appTime: String
     appYear: Int
     }, 
     type User {
    _id: ID
    email: String
    password: String 
    username: String
    profiles: [Profile] 
    bookingdates: [Bookingdate] 
  },
  type Auth {
    token: ID!
    user: User
  },
     
     type Query {
     users: [User]!
     user(username: String): User
     me: User
     profiles: [Profile]
     profile(id: String!): Profile
     bookingdates: [Bookingdate]
     bookingdate(id: String!): Bookingdate
     userbookingdates(username: String): [Bookingdate]  
     
     },

     type Mutation {
    
     addUser(username: String!, email: String!, password: String!): Auth
     login(email: String, password: String): Auth

     addProfile(
     patientfirstname: String,
     patientState: String,
     patientgender: String,
     patientaddress: String,
     patientemail: String,
     patientlastname: String,
     patientcity: String,
     patientnumber: String,
     patientreason: String,
     birthdate: String,
     patientzip: Int,
     mepet: String,
     isBooked: String,
     finalDateISO: String,
     appDay: String,
     appMonth: String,
     appDate: Int,
     appointment: String,
     appTime: String,
     appYear: Int): Profile

     addBookingdate(
     username: String
     isBooked: String
     finalDateISO: String
     appDay: String
     appMonth: String
     appDate: Int
     appTime: String
     appYear: Int
     ): Bookingdate
    
    deleteUser(username: String!): User
    deleteProfile(id: String): Profile
     }
     `;

module.exports = typeDefs;
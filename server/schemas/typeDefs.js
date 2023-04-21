const { gql } = require('apollo-server-express');

const typeDefs = gql`
 
     type Visitorappointment {
     _id: ID!
     patientfirstname: String
     patientgender: String
     patientaddress: String
     patientemail: String
     patientlastname: String
     patientcity: String
     patientnumber: String
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
    visitorappointments: [Visitorappointment]  
  },
  type Auth {
    token: ID!
    user: User
  },
     
     type Query {
     users: [User]!
     user(username: String): User
     me: User
     visitorappointments(username: String): [Visitorappointment]
     visitorappointment(id: ID!): Visitorappointment
     bookingdates: [Bookingdate]
     bookingdate(id: ID!): Bookingdate
     userBookingdates: [Bookingdate]  
     },

     type Mutation {
    
     addUser(username: String!, email: String!, password: String!): Auth
     login(email: String, password: String): Auth

     addVisitorappointment(
     patientfirstname: String,
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
     appYear: Int): Visitorappointment

     addBookingdate(
     isBooked: String
     finalDateISO: String
     appDay: String
     appMonth: String
     appDate: Int
     appTime: String
     appYear: Int
     ): Bookingdate
     }
     `;

module.exports = typeDefs;
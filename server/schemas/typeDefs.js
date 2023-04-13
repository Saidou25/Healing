const { gql } = require('apollo-server-express');

const typeDefs = gql`
     type Patient {
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
   
     },
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
     }
     
     type Query {
     patients: [Patient]!
     patient(id: ID!): Patient
     Visitorappointments: [Visitorappointment]!
     Visitorappointment(id: ID!): Visitorappointment
     bookingdates: [Bookingdate]
     bookingdate(id: ID!): Bookingdate
     },

     type Mutation {
     addPatient(
     patientfirstname: String
     patientgender: String
     patientaddress: String
     patientemail: String
     patientlastname: String
     patientcity: String
     patientnumber: String
     patientreason: String
     birthdate: String 
     mepet: String
     patientzip: Int): Patient

     addVisitorappointment(
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
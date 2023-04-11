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
     type Date {
     _id: ID!
     startDate: String
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
     type Bookingdate {
     _id: ID!
     startDate: String}
     
     type Query {
     patients: [Patient]!
     patient(id: ID!): Patient
     dates: [Date]!
     date(id: ID!): Date
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
     addDate(
     startDate: String
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
     mepet: String): Date
     addBookingdate(
     startDate: String
     ): Bookingdate
     }
     `;

module.exports = typeDefs;
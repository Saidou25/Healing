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
     }
     
     type Query {
     patients: [Patient]!
     patient(id: ID!): Patient
     dates: [Date]!
     date(id: ID!): Date
     }

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
     addDate(startDate: String!): Date
     }
     `;

module.exports = typeDefs;
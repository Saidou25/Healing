const { gql } = require('apollo-server-express');

const typeDefs = gql`
     type Patient {
     _id: ID!
     patientfirstname: String
     age: Int
     patientemail: String
     patientlastname: String
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
     addPatient(patientfirstname: String!, patientlastname: String!, age: Int!, patientemail: String!): Patient
     addDate(startDate: String!): Date
     }
     `;

module.exports = typeDefs;
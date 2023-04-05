const { gql } = require('apollo-server-express');

const typeDefs = gql`
     type Patient {
     _id: ID!
     patientname: String
     age: Int! 
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
     addPatient(patientname: String!, age: Int!): Patient
     addDate(startDate: String!): Date
     }
     `;

module.exports = typeDefs;
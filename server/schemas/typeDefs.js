const { gql } = require('apollo-server-express');

const typeDefs = gql`
     type Patient {
     _id: ID!
     patientname: String
     age: Int! 
     },
     type Date {
     _id: ID!
     date: String
     }
     
     type Query {
     patients: [Patient]!
     patient(id: ID!): Patient
     dates: [Date]!
     date(id: ID!): Date
     }

     type Mutation {
     addPatient(patientname: String!, age: Int!): Patient
     addDate(date: String!): Date
     }
     `;

module.exports = typeDefs;
const { gql } = require('apollo-server-express');

const typeDefs = gql`
     type Patient {
     _id: ID!
     patientname: String
     age: Int!
  
     }
     
     type Query {
     patients: [Patient]!
     patient(id: ID!): Patient
     }

     type Mutation {
     addPatient(patientname: String!, age: Int!): Patient
     }
     `;

module.exports = typeDefs;
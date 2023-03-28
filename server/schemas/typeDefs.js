const { gql } = require('apollo-server-express');

const typeDefs = gql`
     type Patient {
     _id: ID!
     name: String
     age: Int!
     }
     
     type Query {
     patients: [Patient]!
     patient(id: ID!): Patient!
     }

     type Mutation {
     addPatient(name: String!, age: Int!): patient
     }
     `;

     module.exports = typeDefs;
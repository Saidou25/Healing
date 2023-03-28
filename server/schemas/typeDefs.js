const { gql } = require('apollo-server-express');

const typeDefs = gql`
     type Test {
     _id: ID!
     user: String
     age: Int!
     }
     
     type Query {
     tests: [Test]!
     }
     `;

     module.exports = typeDefs;
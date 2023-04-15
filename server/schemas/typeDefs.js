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
     appointment: String
     },
     type Petappointment {
     _id: ID!
    petBreed: String
    petName: String
    petWeight: Int
    petGender: String
    petReason: String
    petAge: String
    patientgender: String
    birthdate: String
    patientfirstname: String
    patientlastname: String
    patientaddress: String
    patientzip: Int
    patientcity:  String
    patientnumber: String
    patientreason: String
    patientemail: String
    isBooked: String
    finalDateISO: String
    appDay: String
    appMonth: String
    appDate: Int
    appTime: String
    appointment: String
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
     }, 
     type Pet {
     _id: ID!
     petBreed: String
     petName: String
     petWeight: Int
     petGender: String
     petReason: String
     petAge: String
     }
     
     type Query {
     patients: [Patient]!
     patient(id: ID!): Patient
     visitorappointments: [Visitorappointment]!
     visitorappointment(id: ID!): Visitorappointment
     bookingdates: [Bookingdate]
     bookingdate(id: ID!): Bookingdate
     pets: [Pet]!
     pet(id: ID!): Pet
     petappointments: [Petappointment]!
     petappointment(id: ID!): Petappointment
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
     appointment: String
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

     addPetappointment(
     petBreed: String
    petName: String
    petWeight: Int
    petGender: String
    petReason: String
    petAge: String
    patientgender: String
    birthdate: String
    patientfirstname: String
    patientlastname: String
    patientaddress: String
    patientzip: Int
    patientcity:  String
    patientnumber: String
    patientreason: String
    patientemail: String
    isBooked: String
    finalDateISO: String
    appDay: String
    appMonth: String
    appDate: Int
    appTime: String
    appointment: String
    appYear: Int
     ): Petappointment

     addPet(
     petName: String
     petWeight: Int
     petAge: String
     petGender: String
     petReason: String
     petBreed: String
     ): Pet
     }
     `;

module.exports = typeDefs;
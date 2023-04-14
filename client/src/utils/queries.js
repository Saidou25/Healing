import { gql } from '@apollo/client';

export const QUERY_PATIENTS = gql`
     query patients {
     patients {
     _id
     patientfirstname
     patientgender
     patientaddress
     patientemail
     patientlastname
     patientcity
     patientnumber
     patientreason
     birthdate
     patientzip
     mepet
       }
   }
`;

export const QUERY_PATIENT = gql`
    query patient($id: ID!) {
     patient(id: $id) {
     _id
     patientfirstname
     patientgender
     patientaddress
     patientemail
     patientlastname
     patientcity
     patientnumber
     patientreason
     birthdate
     patientzip
     mepet
        }
     }
 `;
export const QUERY_VISITORAPPOINTMENTS = gql`
    query visitorappointments {
       visitorappointments {
     _id
     patientfirstname
     patientgender
     patientaddress
     patientemail
     patientlastname
     patientcity
     patientnumber
     patientreason
     birthdate
     patientzip
     mepet
     isBooked
     finalDateISO
     appDay
     appMonth
     appTime
     appYear
        }
     }
 `;
export const QUERY_VISITORAPPOINTMENT = gql`
    query visitorappointment($id: ID!) {
        visitorappointment(id: $id) {
     _id 
     patientfirstname
     patientgender
     patientaddress
     patientemail
     patientlastname
     patientcity
     patientnumber
     patientreason
     birthdate
     patientzip
     mepet
     isBooked
     finalDateISO
     appDay
     appMonth
     appTime
     appYear
        }
     }
 `;
export const QUERY_BOOKINGDATES = gql`
 query bookingdates {
     bookingdates {
     _id
     isBooked
     finalDateISO
     appDay
     appMonth
     appTime
     appYear
        
     }
  }
`;
export const QUERY_BOOKINGDATE = gql`
    query bookingdate($id: ID!) {
         bookingdate(id: $id) {
     _id
     isBooked
     finalDateISO
     appDay
     appMonth
     appTime
     appYear
        }
     }
 `;
 export const QUERY_PET = gql`
 query pet($id: ID!) {
 pet(id: $id) {
    petName
     petBreed
     petWeight
     petAge
     petReason
     petGender
     }
     }
     `;
 export const QUERY_PETS = gql`
 query pets {
 pets {
    petName
     petBreed
     petWeight
     petAge
     petReason
     petGender
     }
     }
     `;
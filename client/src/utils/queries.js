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
    query Visitorappointments {
       Visitorappointments {
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
    query Visitorappointment($id: ID!) {
        Visitorappointment(id: $id) {
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
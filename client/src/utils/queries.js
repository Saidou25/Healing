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
export const QUERY_DATES = gql`
    query dates {
        dates {
            _id
            startDate
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
export const QUERY_DATE = gql`
    query date($id: ID!) {
        date(id: $id) {
     _id 
     startDate
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
 export const QUERY_BOOKINGDATES = gql`
 query bookingdates {
     bookingdates {
         _id
         startDate
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
export const QUERY_BOOKINGDATE = gql`
    query bookingdate($id: ID!) {
        bookingdate(id: $id) {
            _id
            startDate
        }
     }
 `;
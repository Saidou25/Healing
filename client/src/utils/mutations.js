import { gql } from '@apollo/client';

export const ADD_PATIENT = gql`
    mutation addPatient(
     $patientfirstname: String
     $patientgender: String
     $patientaddress: String
     $patientemail: String
     $patientlastname: String
     $patientcity: String
     $patientnumber: String
     $patientreason: String
     $birthdate: String
     $ patientzip: Int
     $mepet: String) {
          addPatient(
            patientfirstname: $patientfirstname
         patientgender: $patientgender
     patientaddress: $patientaddress
     patientemail: $patientemail
     patientlastname: $patientlastname
     patientcity: $patientcity
     patientnumber: $patientnumber
     patientreason: $patientreason
     birthdate: $birthdate
     patientzip: $patientzip
     mepet: $mepet
          ) { 
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
export const ADD_DATE = gql`
    mutation addDate($startDate: String!) {
          addDate(startDate: $startDate) { 
             _id          
             startDate
             }
    }
`;
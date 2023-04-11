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
        }
     }
 `;
export const QUERY_DATE = gql`
    query date($id: ID!) {
        date(id: $id) {
            _id
            startDate
        }
     }
 `;
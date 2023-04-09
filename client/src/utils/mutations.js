import { gql } from '@apollo/client';

export const ADD_PATIENT = gql`
    mutation addPatient($patientfirstname: String!, $patientlastname: String!, $age: Int!, $patientemail: String!) {
          addPatient(patientfirstname: $patientfirstname, patientlastname: $patientlastname, age: $age, patientemail: $patientemail) { 
             _id          
             patientfirstname
             patientlastname
             age
             patientemail
             }
    }
`;
export const ADD_DATE= gql`
    mutation addDate($startDate: String!) {
          addDate(startDate: $startDate) { 
             _id          
             startDate
             }
    }
`;
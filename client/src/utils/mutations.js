import { gql } from '@apollo/client';

export const ADD_PATIENT = gql`
    mutation addPatient($patientname: String!, $age: Int!) {
          addPatient(patientname: $patientname, age: $age) { 
             _id          
             patientname
             age
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
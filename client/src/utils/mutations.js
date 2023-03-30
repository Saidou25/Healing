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
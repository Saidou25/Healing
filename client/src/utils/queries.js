import { gql } from '@apollo/client';

export const QUERY_PATIENTS = gql`
     query patients {
         patients {
         _id
         patientname
         age
       }
   }
`;

export const QUERY_PATIENT = gql`
    query patient($id: ID!) {
        patient(id: $id) {
            _id
            patientname
            age
        }
     }
 `;
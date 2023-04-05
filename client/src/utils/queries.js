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
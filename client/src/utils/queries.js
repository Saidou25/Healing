import { gql } from '@apollo-client';

export const QUERY_PATIENTS = gql`
query patients {
patients {
_id
name
age
}
}
`;

export const QUERY_PATIENT = gql`
    query patient($id: ID!) {
        user(id: $id) {
            _id
            name
            age
            }
            }
            `;
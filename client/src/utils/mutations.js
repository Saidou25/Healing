import { gql } from '@apollo/client';

export const ADD_PATIENT = gql`
    mutation addPatient($name: String!, $age: Int!) {
    addPatient(name: $name, age: $age)
    }
    `;
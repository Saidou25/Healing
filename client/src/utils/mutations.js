import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const UPDATE_USER = gql`
  mutation updateUser($username: String!, $email: String!, $profile: Profile!) {
    updateUser(username: $username, email: $email, profile: $profile) {
      token
      user {
        _id
        username
      }
      profile {
        _id
        username
        patientState
        patientfirstname
        patientgender
        patientaddress
        patientlastname
        patientcity
        patientnumber
        birthdate
        patientzip
        mepet
      }
    }
  }
`;

export const ADD_PET = gql`
  mutation addPet(
    $username: String!
    $profileId: String
    $petName: String!
    $petWeight: Int!
    $petAge: String!
    $petKind: String
    $petGender: String!
    $petBreed: String!
  ) {
    addPet(
      username: $username
      profileId: $profileId
      petName: $petName
      petWeight: $petWeight
      petAge: $petAge
      petKind: $petKind
      petGender: $petGender
      petBreed: $petBreed
    ) {
      _id
      petName
      petBreed
      petWeight
      profileId
      petKind
      petAge
      petGender
      username
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview(
    $username: String
    $title: String!
    $reviewText: String!
    $rating: String
    $reviewDate: String!
  ) {
    addReview(
      username: $username
      title: $title
      reviewText: $reviewText
      rating: $rating
      reviewDate: $reviewDate
    ) {
      _id
      username
      title
      reviewText
      rating
      reviewDate
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview($id: String!) {
    deleteReview(id: $id) {
      _id
    }
  }
`;
export const DELETE_BOOKINGDATE = gql`
  mutation deleteBookingdate($id: String!) {
    deleteBookingdate(id: $id) {
      _id
      username
      startDate
      digitalAppointment
      appointmentString
      reason
    }
  }
`;

export const ADD_BOOKINGDATE = gql`
  mutation addBookingdate(
    $username: String
    $startDate: String!
    $digitalAppointment: String!
    $appointmentString: String!
    $reason: String!
  ) {
    addBookingdate(
      username: $username
      startDate: $startDate
      digitalAppointment: $digitalAppointment
      appointmentString: $appointmentString
      reason: $reason
    ) {
      _id
      username
      startDate
      digitalAppointment
      appointmentString
      reason
    }
  }
`;
export const DELETE_USER = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
      _id
      username
      email
      reviews {
        _id
        username
        title
        reviewText
      }
      bookingdates {
        _id
        username
        startDate
        digitalAppointment
        appointmentString
        reason
      }
      profile {
        _id
        patientfirstname
        username
        patientgender
        patientState
        patientaddress
        patientlastname
        patientcity
        patientnumber
        birthdate
        patientzip
        mepet
        pets {
          _id
          petName
          petGender
          petAge
          petBreed
          petWeight
          username
        }
      }
    }
  }
`;

export const DELETE_PET = gql`
  mutation deletePet($username: String!) {
    deletePet(username: $username) {
      _id
      petName
      petGender
      petAge
      petBreed
      petWeight
      username
      petKind
      profileId
    }
  }
`;
export const ADD_PROFILE = gql`
  mutation addProfile(
    $username: String!
    $patientfirstname: String!
    $patientgender: String
    $patientaddress: String!
    $patientlastname: String!
    $patientcity: String!
    $patientnumber: String!
    $birthdate: String
    $patientState: String!
    $patientzip: String!
    $mepet: String
  ) {
    addProfile(
      username: $username
      patientfirstname: $patientfirstname
      patientgender: $patientgender
      patientaddress: $patientaddress
      patientState: $patientState
      patientlastname: $patientlastname
      patientcity: $patientcity
      patientnumber: $patientnumber
      birthdate: $birthdate
      patientzip: $patientzip
      mepet: $mepet
    ) {
      _id
      username
      patientState
      patientfirstname
      patientgender
      patientaddress
      patientlastname
      patientcity
      patientnumber
      birthdate
      patientzip
      mepet
      pets {
        _id
        petName
        username
        petGender
        petAge
        petWeight
        petBreed
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $id: String
    $username: String
    $patientaddress: String
    $patientlastname: String
    $patientcity: String
    $patientState: String
    $patientzip: String
    $patientnumber: String!
  ) {
    updateProfile(
      id: $id
      username: $username
      patientaddress: $patientaddress
      patientState: $patientState
      patientlastname: $patientlastname
      patientcity: $patientcity
      patientnumber: $patientnumber
      patientzip: $patientzip
    ) {
      _id
      patientState
      username
      patientfirstname
      patientgender
      patientaddress
      patientlastname
      patientcity
      patientnumber
      birthdate
      patientzip
      mepet
    }
  }
`;

export const DELETE_PROFILE = gql`
  mutation deleteProfile($id: String!) {
    deleteProfile(id: $id) {
      _id
      patientState
      username
      patientfirstname
      patientgender
      patientaddress
      patientlastname
      patientcity
      patientnumber
      birthdate
      patientzip
      mepet
    }
  }
`;

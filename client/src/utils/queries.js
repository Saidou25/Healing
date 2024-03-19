import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      bookingdates {
        _id
        username
        startDate
        digitalAppointment
        appointmentString
        reason
      }
      reviews {
        _id
        username
        title
        rating
        reviewText
        reviewDate
      }
      profile {
        _id
        patientfirstname
        username
        patientgender
        patientaddress
        patientlastname
        patientcity
        patientnumber
        birthdate
        patientState
        patientzip
      }
    }
  }
`;
export const QUERY_USER = gql`
  query user($id: String!) {
    user(id: $id) {
      _id
      username
      email
      reviews {
        _id
        username
        title
        reviewText
        rating
        reviewDate
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
      }
    }
  }
`;
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      reviews {
        _id
        title
        username
        reviewText
        rating
        reviewDate
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
        patientState
        patientfirstname
        username
        patientgender
        patientaddress
        patientlastname
        patientcity
        patientnumber
        birthdate
        patientzip
      }
    }
  }
`;

export const QUERY_BOOKINGDATES = gql`
  query bookingdates {
    bookingdates {
      _id
      username
      startDate
      digitalAppointment
      appointmentString
      reason
    }
  }
`;
export const QUERY_REVIEWS = gql`
  query reviews {
    reviews {
      _id
      username
      title
      reviewText
      rating
      reviewDate
    }
  }
`;
export const QUERY_REVIEW = gql`
  query review($id: ID!) {
    review(id: $id) {
      _id
      username
      title
      reviewText
      rating
      reviewDate
    }
  }
`;
export const QUERY_BOOKINGDATE = gql`
  query bookingdate($id: ID!) {
    bookingdate(id: $id) {
      _id
      username
      startDate
      digitalAppointment
      appointmentString
      reason
    }
  }
`;

export const QUERY_USERBOOKINGDATES = gql`
  query userbookingdates($username: String!) {
    userbookingdates(username: $username) {
      _id
      username
      startDate
      digitalAppointment
      appointmentString
      reason
    }
  }
`;
export const QUERY_PROFILES = gql`
  query profiles {
    profiles {
      _id
      patientfirstname
      patientgender
      patientaddress
      patientlastname
      patientcity
      username
      patientnumber
      patientState
      birthdate
      patientzip
    }
  }
`;
export const QUERY_PROFILE = gql`
  query profile($id: ID!) {
    profile(id: $id) {
      _id
      patientfirstname
      patientgender
      username
      patientaddress
      patientState
      patientlastname
      patientcity
      patientnumber
      birthdate
      patientzip
    }
  }
`;

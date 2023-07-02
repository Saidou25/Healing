import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      bookingdates {
        _id
        isBooked
        username
        finalDateISO
        digitMonth
        reason
        appDay
        digitalAppointment
        appDate
        appMonth
        appTime
        appYear
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
        patientreason
        birthdate
        patientState
        patientzip
        mepet
        isBooked
        appointment
        appDay
        appMonth
        appTime
        appYear
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
        rviewDate
      }
      bookingdates {
        _id
        isBooked
        username
        finalDateISO
        digitMonth
        digitalAppointment
        reason
        appDay
        appDate
        appMonth
        appTime
        appYear
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
        patientreason
        birthdate
        patientzip
        mepet
        isBooked
        appointment
        appDay
        appMonth
        appTime
        appYear
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
        isBooked
        username
        digitMonth
        reason
        finalDateISO
        appDay
        appDate
        digitalAppointment
        appMonth
        appTime
        appYear
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
        patientreason
        birthdate
        patientzip
        mepet
        isBooked
        appointment
        appDay
        appMonth
        appTime
        appYear
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

export const QUERY_BOOKINGDATES = gql`
  query bookingdates {
    bookingdates {
      _id
      isBooked
      username
      finalDateISO
      digitMonth
      appDay
      reason
      digitalAppointment
      appDate
      appMonth
      appTime
      appYear
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
      isBooked
      finalDateISO
      appDay
      appDate
      reason
      digitalAppointment
      digitMonth
      appMonth
      appTime
      appYear
    }
  }
`;

export const QUERY_PETS = gql`
  query pets {
    pets {
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
export const QUERY_PET = gql`
  query pet($username: String!) {
    pet(username: $username) {
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
export const QUERY_USERBOOKINGDATES = gql`
  query userbookingdates($username: String!) {
    userbookingdates(username: $username) {
      _id
      username
      isBooked
      finalDateISO
      appDate
      appDay
      reason
      appMonth
      appTime
      appYear
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
      patientreason
      patientState
      birthdate
      patientzip
      mepet
      isBooked
      appointment
      appDay
      appMonth
      appDate
      appTime
      appYear
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
      patientreason
      birthdate
      patientzip
      mepet
      isBooked
      appDay
      appDate
      appMonth
      appointment
      appTime
      appYear
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
`;

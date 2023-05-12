import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      note {
        _id
      noteTitle
      }
      bookingdates {
      _id
     isBooked
     username
     finalDateISO
     appDay
     appDate
     appMonth
     appTime
     appYear
        }
        reviews {
     _id
     username
    title
    reviewText
     }
      profile {
 _id
 patientfirstname
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
    }
  }
  }
`;
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      note {
        _id
      noteTitle
      }
      reviews {
     _id
     username
    title
    reviewText
     }
      bookingdates {
      _id
     isBooked
     username
     finalDateISO
     appDay
     appDate
     appMonth
     appTime
     appYear
        }
      profile {
 _id
 patientfirstname
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
      note {
      _id
      noteTitle
      }
      reviews {
     _id
    title
    username
    reviewText
     }
      bookingdates {
      _id
     isBooked
     username
     finalDateISO
     appDay
     appDate
     appMonth
     appTime
     appYear
        }
      profile {
 _id
 patientState
 patientfirstname
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
     appDay
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
     }
  }
`;
export const QUERY_NOTES = gql`
 query notes {
     notes {
     _id
    noteTitle
     }
  }
`;
export const QUERY_NOTE = gql`
 query note($id: ID!) {
     note(id: $id) {
     _id
    noteTitle
     }
  }
`;

export const QUERY_BOOKINGDATE = gql`
    query bookingdate($username: String!) {
         bookingdate(id: $id) {
     _id
     username
     isBooked
     finalDateISO
     appDay
     appDate
     appMonth
     appTime
     appYear
        }
     }
 `;
export const QUERY_USERBOOKINGDATES= gql`
    query userbookingdates($username: String!) {
      userbookingdates(username: $username) {
     _id
     username
     isBooked
     finalDateISO
     appDate
     appDay
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
 
    }
 }
`;
export const QUERY_PROFILE = gql`
query profile($id: ID!) {
    profile(id: $id) {
 _id 
 patientfirstname
 patientgender
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
 
    }
 }
`;
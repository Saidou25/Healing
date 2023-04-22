import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      visitorappointments {
 _id
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
 finalDateISO
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
      visitorappointments {
 _id
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
 finalDateISO
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
      visitorappointments {
 _id
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
 finalDateISO
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
     finalDateISO
     appDay
     appMonth
     appTime
     appYear
        
     }
  }
`;
export const QUERY_BOOKINGDATE = gql`
    query bookingdate($id: ID!) {
         bookingdate(id: $id) {
     _id
     isBooked
     finalDateISO
     appDay
     appMonth
     appTime
     appYear
        }
     }
 `;
export const QUERY_VISITORAPPOINTMENTS = gql`
query visitorappointments {
   visitorappointments {
 _id
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
 finalDateISO
 appointment
 appDay
 appMonth
 appTime
 appYear
    }
 }
`;
export const QUERY_VISITORAPPOINTMENT = gql`
query visitorappointment($id: ID!) {
    visitorappointment(id: $id) {
 _id 
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
 finalDateISO
 appDay
 appMonth
 appointment
 appTime
 appYear
    }
 }
`;


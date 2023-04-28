import { gql } from '@apollo/client';


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
export const DELETE_USER = gql`
   mutation deleteUser($username: String!) {
   deleteUser(username: $username) {
   _id
   username
   }
   }
   `;



export const ADD_BOOKINGDATE = gql`
     mutation addBookingdate(
     $username: String,
     $isBooked: String,
     $finalDateISO: String,
     $appDay: String,
     $appMonth: String,
     $appDate: Int,
     $appTime: String,
     $appYear: Int
     ) {
     addBookingdate(
     username: $username,
        isBooked: $isBooked,
        finalDateISO: $finalDateISO,
        appDay: $appDay,
     appMonth: $appMonth,
     appDate: $appDate,
     appTime: $appTime,
     appYear: $appYear
        
         ) {
         _id    
         username
         isBooked
        finalDateISO  
        appDay
     appMonth
     appTime
     appYear
     appDate
                 }
      }
     `;
     export const ADD_PROFILE = gql`
     mutation addProfile(
     $patientfirstname: String,
      $patientgender: String,
      $patientaddress: String,
      $patientlastname: String,
      $patientcity: String,
      $patientnumber: String,
      $patientreason: String,
      $birthdate: String,
      $patientState: String,
      $patientzip: Int,
      $mepet: String,
      $isBooked: String,
      $finalDateISO: String,
      $appDay: String,
      $appMonth: String,
      $appDate: Int,
      $appointment: String,
      $appTime: String,
      $appYear: Int) {
         addProfile(
          patientfirstname: $patientfirstname,
          patientgender: $patientgender,
      patientaddress: $patientaddress,
         patientState: $patientState,
      patientlastname: $patientlastname,
      patientcity: $patientcity,
      patientnumber: $patientnumber,
      patientreason: $patientreason,
      birthdate: $birthdate,
      patientzip: $patientzip,
      mepet: $mepet,
      isBooked: $isBooked,
         finalDateISO: $finalDateISO,
         appDay: $appDay,
      appMonth: $appMonth,
      appDate: $appDate,
      appTime: $appTime,
      appYear: $appYear,
      appointment: $appointment) { 
        _id
         isBooked
         finalDateISO  
         patientState
         appDay
      appMonth
      appTime
      appYear
      appDate
        appointment
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
              }             
     }
 `;
 

     


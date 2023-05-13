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
         isBooked
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
  }
`;

export const ADD_PET = gql`
     mutation addPet(
     $profileId: String
     $petName: String
     $petWeight: Int
     $petAge: String
     $petGender: String
     $petBreed: String) {
     addPet(
     profileId: $profileId
        petName: $petName
     petWeight: $petWeight
     petAge:  $petAge
     petGender: $petGender
     petBreed: $petBreed) {
     _id
     petName
     petBreed
     petWeight
     petAge
     petGender
     profileId
     }
     }
     `;

export const ADD_REVIEW = gql`
  mutation addReview($username: String, $title: String!, $reviewText: String!) {
    addReview(username: $username, title: $title, reviewText: $reviewText) {
        _id
        username
        title
        reviewText
    }
 }
`;
export const ADD_NOTE = gql`
  mutation addNote($noteTitle: String!) {
    addNote(noteTitle: $noteTitle) {
        _id
        noteTitle
    }
 }
`;
export const UPDATE_NOTE = gql`
  mutation updateNote($id: String!, $noteTitle: String!) {
    updateNote(id: $id, noteTitle: $noteTitle) {
        _id
        noteTitle
    }
 }
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview($id: String!) {
    deleteReview(id: $id) {
        _id
        username
        title
        reviewText
    }
  }
`;
export const DELETE_USER = gql`
   mutation deleteUser($id: String!) {
   deleteUser(id: $id) {
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
     $reason: String,
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
     reason: $reason,
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
     reason
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
         appDay: $appDay,
      appMonth: $appMonth,
      appDate: $appDate,
      appTime: $appTime,
      appYear: $appYear,
      appointment: $appointment) { 
        _id
         isBooked 
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
      pets {
      _id
      petName
      petGender
      petAge
      petWeight
      petBreed
      profileId
      }
              }             
     }
 `;


     export const UPDATE_PROFILE = gql`
     mutation updateProfile($id: String,
      $patientaddress: String,
      $patientlastname: String,
      $patientcity: String,
      $patientState: String,
      $patientzip: Int,
      $patientnumber: String
      ) {
         updateProfile(
        id: $id
      patientaddress: $patientaddress,
         patientState: $patientState,
      patientlastname: $patientlastname,
      patientcity: $patientcity,
      patientnumber: $patientnumber,
      patientzip: $patientzip,) { 
        _id
         isBooked
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
 

     


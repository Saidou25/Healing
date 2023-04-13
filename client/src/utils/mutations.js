import { gql } from '@apollo/client';

export const ADD_PATIENT = gql`
    mutation addPatient(
     $patientfirstname: String
     $patientgender: String
     $patientaddress: String
     $patientemail: String
     $patientlastname: String
     $patientcity: String
     $patientnumber: String
     $patientreason: String
     $birthdate: String
     $patientzip: Int
     $mepet: String) {
          addPatient(
            patientfirstname: $patientfirstname
         patientgender: $patientgender
     patientaddress: $patientaddress
     patientemail: $patientemail
     patientlastname: $patientlastname
     patientcity: $patientcity
     patientnumber: $patientnumber
     patientreason: $patientreason
     birthdate: $birthdate
     patientzip: $patientzip
     mepet: $mepet
          ) { 
             _id          
             patientfirstname
         patientgender
     patientaddress
     patientemail
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
export const ADD_BOOKINGDATE = gql`
     mutation addBookingdate(
     $isBooked: String
     $finalDateISO: String
     $appDay: String
     $appMonth: String
     $appDate: Int
     $appTime: String
     $appYear: Int
     ) {
     addBookingdate(
        isBooked: $isBooked
        finalDateISO: $finalDateISO
        appDay: $appDay
     appMonth: $appMonth
     appDate: $appDate
     appTime: $appTime
     appYear: $appYear
        
         ) {
         _id    
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
export const ADD_VISITORAPPOINTMENT = gql`
    mutation addVisitorappointment(
    $patientfirstname: String
     $patientgender: String
     $patientaddress: String
     $patientemail: String
     $patientlastname: String
     $patientcity: String
     $patientnumber: String
     $patientreason: String
     $birthdate: String
     $patientzip: Int
     $mepet: String
     $isBooked: String
     $finalDateISO: String
     $appDay: String
     $appMonth: String
     $appDate: Int
     $appTime: String
     $appYear: Int) {
        addVisitorappointment(
          patientfirstname: $patientfirstname
         patientgender: $patientgender
     patientaddress: $patientaddress
     patientemail: $patientemail
     patientlastname: $patientlastname
     patientcity: $patientcity
     patientnumber: $patientnumber
     patientreason: $patientreason
     birthdate: $birthdate
     patientzip: $patientzip
     mepet: $mepet
     isBooked: $isBooked
        finalDateISO: $finalDateISO
        appDay: $appDay
     appMonth: $appMonth
     appDate: $appDate
     appTime: $appTime
     appYear: $appYear) { 
             _id          
             isBooked
        finalDateISO  
        appDay
     appMonth
     appTime
     appYear
     appDate
                 
             patientfirstname
         patientgender
     patientaddress
     patientemail
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
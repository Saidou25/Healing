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
export const ADD_PET = gql`
     mutation addPet(
     $petName: String
     $petWeight: Int
     $petAge: String
     $petGender: String
     $petReason: String
     $petBreed: String) {
     addPet(
        petName: $petName
     petWeight: $petWeight
     petAge:  $petAge
     petGender: $petGender
     petReason: $petReason
     petBreed: $petBreed) {
     _id
     petName
     petBreed
     petWeight
     petAge
     petReason
     petGender
     }
     }
     `;
export const ADD_PETAPPOINTMENT = gql`
     mutation addPetappointment(
        $petBreed: String
        $petName: String
        $petWeight: Int
        $petGender: String
        $petReason: String
        $petAge: String
        $patientgender: String
        $patientfirstname: String
        $patientlastname: String
        $patientaddress: String
        $patientzip: Int
        $patientnumber: String
        $patientcity: String
        $patientreason: String
        $patientemail: String
        $isBooked: String
        $finalDateISO: String
        $appDay: String
        $appMonth: String
        $appDate: Int
        $appTime: String
        $appointment: String
        $appYear: Int) {
     addPetappointment(
        petName: $petName
                petWeight: $petWeight
                petAge: $petAge
                petGender: $petGender
                petReason: $petReason
                petBreed: $petBreed
                patientgender: $patientgender
                patientfirstname: $patientfirstname
                patientlastname: $patientlastname
                patientaddress: $patientaddress
                patientzip: $patientzip
                patientcity: $patientcity
                patientnumber: $patientnumber
                patientreason: $patientreason
                patientemail: $patientemail
                isBooked: $isBooked
                finalDateISO: $finalDateISO
                appDay: $appDay
                appMonth: $appMonth
                appDate: $appDate
                appTime: $appTime
                appointment: $appointment
                appYear: $appYear) {
     _id
     petName
                petWeight
                petAge
                petGender
                petBreed
                patientgender
                patientlastname
                patientaddress
                patientzip
                patientnumber
                patientemail
                isBooked
                finalDateISO
                appDay
                appMonth
                appDate
                appTime
                appointment
                appYear
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
     $appointment: String
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
     appYear: $appYear
     appointment: $appointment) { 
             _id          
             isBooked
        finalDateISO  
        appDay
     appMonth
     appTime
     appYear
     appDate
                 appointment
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
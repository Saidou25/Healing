// import React, { useRef, useState } from "react";
// import { useMutation } from "@apollo/client";
// import { ADD_PATIENT } from "../../utils/mutations";

// import './index.css';

// const Info = () => {

//     const form = useRef();
//     const [patientfirstname, setPatientFirstName] = useState('');
//     const [patientlastname, setPatientLastName] = useState('');
//     const [age, setAge] = useState("");
//     const [patientemail, setPatientEmail] = useState("");


//     const [addPatient, { data, loading, error }] = useMutation(ADD_PATIENT);

//     if (loading) return 'Submitting...';
//     if (error) return `Submission error! ${error.message}`;

//     const handleInputChange = (e) => {
//         const x = document.querySelector(".validate");
//         const y = document.querySelector(".invalidate");
//         const x1 = document.querySelector(".validate1");
//         const y1 = document.querySelector(".invalidate1");
//         const x2 = document.querySelector(".validate2");
//         const y2 = document.querySelector(".invalidate2");
//         const x3 = document.querySelector(".validate3");
//         const y3 = document.querySelector(".invalidate3");

//         const emailRegex = /^\S+@\S+\.\S+$/;

//         const { name, value } = e.target;

//         if (name === 'patientfirstname') {
//             setPatientFirstName(value);

//             if (value.length > 0) {

//                 x.style.display = "block";
//                 y.style.display = "none";
//             } else {

//                 x.style.display = "none";
//                 y.style.display = "block";
//             }
//         }
//         if (name === 'patientlastname') {
//             setPatientLastName(value);

//             if (value.length > 0) {

//                 x1.style.display = "block";
//                 y1.style.display = "none";
//             } else {

//                 x1.style.display = "none";
//                 y1.style.display = "block";
//             }
//         }
//         if (name === 'age') {

//             setAge(value);
//             if (value.length > 1 && value > 17) {


//                 x2.style.display = "block";
//                 y2.style.display = "none";
//             } else {

//                 x2.style.display = "none";
//                 y2.style.display = "block";
//             }

//         }
//         if (name === 'patientemail') {

//             setPatientEmail(value);

//             if (value.length > 0 && emailRegex.test(value)) {

//                 x3.style.display = "block";
//                 y3.style.display = "none";
//             } else {

//                 x3.style.display = "none";
//                 y3.style.display = "block";
//             }

//         }
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         const patientfirstname = e.target.patientfirstname.value;
//         const patientlastname = e.target.patientlastname.value;
//         const age = e.target.age.value;
//         const patientemail = e.target.patientemail.value;

//         try {
//             await addPatient({ variables: { patientfirstname: patientfirstname, patientlastname: patientlastname, age: parseInt(age), patientemail: patientemail } });

//             setPatientFirstName("");
//             setPatientLastName("")
//             setAge("");
//             setPatientEmail("");

//             console.log(`success adding ${patientfirstname}`)

//         } catch (err) {
//             console.error(err);
//         }
//     };

//     return (
//         <>
//             <div className="space">
//                 <div className='title'>Information form</div>
//             </div>
//             <div className="row">
//                 <form ref={form} onSubmit={handleFormSubmit} className='row profile'>
//                     <div className="col-6">
//                         <label className="form-label1"> First name</label>
//                         <input
//                             className="form-control"
//                             onChange={handleInputChange}
//                             type="text"
//                             value={patientfirstname}
//                             name="patientfirstname"
//                             placeholder="first name..." />
//                         <div className='validate'>
//                             Looks good
//                             <i className="fa-solid fa-check"></i>
//                         </div>
//                         <div className='invalidate'>
//                             required
//                             <i className="fa-solid fa-check"></i>
//                         </div>
//                     </div>
//                     <div className="col-6">
//                         <label className="form-label1"> Last name</label>
//                         <input
//                             className="form-control"
//                             onChange={handleInputChange}
//                             type="text"
//                             value={patientlastname}
//                             name="patientlastname"
//                             placeholder="last name..." />
//                         <div className='validate1'>
//                             Looks good
//                             <i className="fa-solid fa-check"></i>
//                         </div>
//                         <div className='invalidate1'>
//                             required
//                             <i className="fa-solid fa-check"></i>
//                         </div>
//                     </div>
//                     <div className="col-6">
//                         <label className="form-label1">Age</label>
//                         <input
//                             className="form-control"
//                             value={age}
//                             onChange={handleInputChange}
//                             type="Number"
//                             name="age"
//                             placeholder="age..." />
//                         <div className='validate2'>
//                             Looks good
//                             <i className="fa-solid fa-check"></i>
//                         </div>
//                         <div className='invalidate2'>
//                             required
//                             <i className="fa-solid fa-check"></i>
//                         </div>
//                     </div>
//                     <div className="col-6">
//                         <label className="form-label1">Email</label>
//                         <input
//                             className="form-control"
//                             value={patientemail}
//                             onChange={handleInputChange}
//                             type="text"
//                             name="patientemail"
//                             placeholder="exampl@example.com" />
//                         <div className='validate3'>
//                             Looks good
//                             <i className="fa-solid fa-check"></i>
//                         </div>
//                         <div className='invalidate3'>
//                             required
//                             <i className="fa-solid fa-check"></i>
//                         </div>
//                     </div>

//                     <div className="col-12">
//                         <button className="btn btn-primary"
//                             type="submit"
//                             value="Send">Submit</button>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// };
// export default Info;
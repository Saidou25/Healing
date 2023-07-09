// import React from "react";
// import { Link } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import Footer from "../Footer";
// import practitioner from "../../assets/images/practitioner.jpeg";
// import "react-datepicker/dist/react-datepicker-cssmodules.css";
// import "react-datepicker/dist/react-datepicker.css";
// import "./index.css";

// const Appointment = () => {
//   return (
//     <>
//      <div className="goback-app d-flex justify-content-center">
//         <Link to="/Dashboard">
//           <button type="btn" className="btn-goback-app text-white">
//             go back
//           </button>
//         </Link>
//       </div>
//       <div className="container-app">
//         <div className="img-appointment" src={practitioner} alt="care">
//           <div className="card-app">
//             <h4 className="card-header-app text-primary mt-5">
//               Book your appointment
//             </h4>
//             <div className="card-body">
//               <form id="app-form">
//                 <div className="row">
//                   <div className="col-12 appointment-colum">
//                     <label className="form-label">
//                       Who is the appointment for?
//                     </label>
//                   </div>
//                   <div></div>
//                   <div className="col-12 visit-app">
//                     <div>
//                       <input
//                         className="radio m-2 "
//                         type="radio"
//                         name="mepet"
//                         value="me"
//                         // checked={mepet === "me"}
//                         // onChange={handleChange}
//                       />{" "}
//                       me
//                       <input
//                         className="radio m-2 "
//                         type="radio"
//                         name="mepet"
//                         value="mypet"
//                         // checked={mepet === "mypet"}
//                         // onChange={handleChange}
//                       />{" "}
//                       my pet
//                     </div>
//                   </div>
//                   {/* {showPetName === "mypet" ? ( */}
//                   <div className="col-12 appointment-colum">
//                     <div>
//                       <label className="form-label mb-3">
//                         What is your pet name
//                       </label>
//                       <input
//                         className="form-control type-your-text mt-3 mb-3"
//                         name="petForm"
//                         //   value={petForm}
//                         placeholder="name..."
//                         type="text"
//                         //   onChange={handleChange}
//                       ></input>
//                     </div>
//                   </div>
//                   {/* ) : ( */}
//                   <></>
//                   {/* )} */}
//                   <div className="col-12 date-picker mb-1">
//                     <label className="form-label">
//                       Choose your appointment date
//                     </label>
//                     <div className="choose-date mt-4 mb-2">
//                       <DatePicker
//                         id="user_date"
//                         timeIntervals={15}
//                         // set to today for past appointment demo purpose. Will be set to new Date + 1 in future.
//                         minDate={new Date()}
//                         // excludeDates={allAppointments}
//                         // selected={startDate}
//                         // onChange={(date) => {
//                         //   setStartDate(date);
//                         //   formatTime(date);
//                         // }}
//                         showTimeSelect
//                         // minTime={setHours(setMinutes(new Date(), 0), 9)}
//                         // maxTime={setHours(setMinutes(new Date(), 0), 19)}
//                         dateFormat="MMMM d, yyyy h:mm aa"
//                         withPortal
//                         // footer={footer};
//                       />
//                     </div>
//                   </div>
//                   <div className="col-12 appointment-colum">
//                     <div>
//                       <label className="form-label mb-3">
//                         What is your reason for visiting?
//                       </label>
//                       <textarea
//                         className="form-control type-your-text mt-3 mb-4"
//                         name="reason"
//                         // value={reason}
//                         type="text"
//                         placeholder="type your text here..."
//                         // onChange={handleChange}
//                       ></textarea>
//                     </div>
//                   </div>
//                   <div>
//                     {/* {error && (
//                   <div className="bg-danger text-white mb-4">
//                     <p className="appoitment-error m-2">{error}</p>
//                   </div>
//                 )} */}
//                   </div>
//                   <div className="col-12 d-flex justify-content-center">
//                     <button
//                       className="btn btn-submitapp text-white mt-2 mb-4 rounded-0"
//                       type="submit"
//                       //   onClick={(e) => handleSubmit(e)}
//                     >
//                       Submit
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//         <div className="text-container">
//           <p className="text-app">
//             sdfasdfadsfasdfasdfsdfas dfasldfasdfhlaksdh
//             falksjhdflkajshdflkajhsdl fajkhsdfl kahs lkdjfhalksjhdf
//             lakjshfdaksdjhf aks dflakjshdflakjshdfkajs
//             dfkajhskdfhaadfasdfasdfasdfasfdasdfs ksjdhf
//           </p>
//           <p className="text-app">
//             1sdfasdfadsfasdfasdfsdfas dfasldfasdfhlaksdh
//             falksjhdflkajshdflkajhsdl fajkhsdfl kahs lkdjfhalksjhdf
//             lakjshfdaksdjhf aks dflakjshdflakjshdfkajs dfkajhskdfha ksjdhf
//           </p>
//           <p className="text-app">
//             2sdfasdfadsfasdfasdfsdfas dfasldfasdfhlaksdh
//             falksjhdflkajshdflkajhsdl fajkhsdfl kahs lkdjfhalksjhdf
//             lakjshfdaksdjhf aks dflakjshdflakjshdfkajs dfkajhskdfha ksjdhf
//           </p>
//         </div>
//       </div>
//       <div className="footer-app">
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default Appointment;

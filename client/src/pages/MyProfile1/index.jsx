// import React, { useState } from 'react';
// import Profile from '../../components/Profile';
// import { useQuery } from '@apollo/client';
// import { QUERY_ME, QUERY_PROFILES } from '../../utils/queries';
// import Navbar from '../../components/Navbar';

// const MyProfile = () => {

//   const { data } = useQuery(QUERY_ME);
//   const me = data?.me || [];
//   const myProfile = me.profile;
//   const myReviews = me.reviews;
//   const userId = me._id;
//   // console.log('id', userId);

//   // const myUserName = meUser.username;

//   // const { meLoading, data: profilesData } = useQuery(QUERY_PROFILES);

//   // const profiles = profilesData?.profiles || [];

//   // const myProfileInfo = profiles.filter(profile => profile.username === myUserName);

//   // const userProfile = myProfileInfo[0]

//   return (
//     <div>
//       <Navbar />
//       {/* <Profile userProfile={userProfile} userId={userId} /> */}
//       <div>My profile: {JSON.stringify(myProfile)}</div>
//       <div>My username: {myProfile.username}</div>
//       <div>My address: {myProfile.patientaddress}</div>
//       <div>My address: {myProfile.patientaddress}</div>
//       <div>My id: {userId}</div>

//       <h3 className="review-list-title mt-4 mb-5">Reviews</h3>
//       <div className="row justify-context-space-between">
//         {myReviews &&
//           myReviews.map((review) => (
//             <div key={review._id} className="col-4">
//               <div className="card text-white bg-primary mb-3">
//                 <div className="card-header">Header</div>
//                 <div className='card-body'>
//                   <p className="card-text" style={{ fontSize: '1rem' }}>
//                     Title: {review.title}</p> <br />
//                   <p className="card-text" style={{ fontSize: '1rem' }}>
//                     Text: {review.reviewText}</p> <br />
//                   <span className="text" style={{ fontSize: '1rem' }}>
//                     Created: fake date</span> <br />
//                   <span className="text" style={{ fontSize: '1rem' }}>
//                     Author: {review.username}</span> < br />
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   )
// };

// export default MyProfile;
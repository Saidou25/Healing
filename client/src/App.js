import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import "bootswatch/dist/lux/bootstrap.min.css";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProfileForm from "./components/ProfileForm";
import AppointmentReview from "./components/AppointmentReview";
import Appointment from "./components/Appointment";
import PetProfileForm from "./components/PetProfileForm";
import PetOwnerProfileForm from "./components/PetOwnerProfileForm";
import ReviewForm from "./components/ReviewForm";
import MyReviewList from "./components/MyReviewList";
import AppointmentHistory from "./components/AppointmentHistory";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import UpcomingAppointments from "./components/UpcomingAppointments";
import AppointmentForm from "./components/AppointmentForm";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./pages/MyProfile";
import Profile from "./components/Profile";
import ContactModal from "./components/ContactModal";
import AllReviews from "./components/AllReviews";
import UpdateMyProfileForm from "./components/UpdateMyProfileForm";
import Visit from "./components/Visit";
import UpdateProfile from "./components/UpdateProfile";
import About from "./components/About";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        reviews: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        bookingdates: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});
// Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route
              path="/UpcomingAppointments"
              element={<UpcomingAppointments />}
            />
            <Route
              path="/PetOwnerProfileForm"
              element={<PetOwnerProfileForm />}
            />
            <Route path="/MyReviewList" element={<MyReviewList />} />
            <Route
              path="/UpdateMyProfileForm"
              element={<UpdateMyProfileForm />}
            />
            <Route path="/UpdateProfile" element={<UpdateProfile />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/AppointmentReview" element={<AppointmentReview />} />
            <Route path="/AppointmentForm" element={<AppointmentForm />} />
            <Route path="/ProfileForm" element={<ProfileForm />} />
            <Route
              path="/AppointmentHistory"
              element={<AppointmentHistory />}
            />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/ContactModal" element={<ContactModal />} />
            <Route path="/PetProfileForm" element={<PetProfileForm />} />
            <Route path="/Appointment" element={<Appointment />} />
            <Route path="/ReviewForm" element={<ReviewForm />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/About" element={<About />} />
            <Route path="/AllReviews" element={<AllReviews />} />
            <Route path="/MyProfile" element={<MyProfile />} />
            <Route path="/Visit" element={<Visit />} />
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;

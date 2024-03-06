import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  defaultDataIdFromObject,
  // defaultDataIdFromObject,
} from "@apollo/client";
import "bootswatch/dist/lux/bootstrap.min.css";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context.js/userContext";

import ProfileForm from "./components/ProfileForm";
import PetProfileForm from "./components/PetProfileForm";
import PetOwnerProfileForm from "./components/PetOwnerProfileForm";
import ReviewForm from "./features/Reviews/ReviewForm";
import MyReviewsList from "./features/Reviews/MyReviewsList";
import AppointmentHistory from "./components/AppointmentHistory";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import UpcomingAppointments from "./features/Appointments/UpcomingAppointments";
import Appointment from "./features/Appointments/Appointment";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./pages/MyProfile";
import Profile from "./components/Profile";
import ContactModal from "./components/ContactModal";
import AllReviews from "./features/Reviews/AllReviews";
import UpdateMyProfileForm from "./components/UpdateMyProfileForm";
import UpdateProfile from "./components/UpdateProfile";
import About from "./components/About";
import Test from "./pages/MyProfile";
import BookingForm from "./features/Appointments/BookingForm";
import ReviewHistory from "./components/ReviewHistory";

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
            return [...incoming];
          },
        },
        bookingdates: {
          merge(existing, incoming) {
            return [...incoming];
          },
        },
      },
    },
  },
  // // Specify a custom dataIdFromObject function if needed
  dataIdFromObject: (object) => {
    switch (object.__typename) {
      case "User":
        return object.id; // Assuming User objects have an 'id' field
      default:
        return defaultDataIdFromObject(object); // Default behavior for other types
    }
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
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="Appointment" element={<Appointment />} />
            <Route path="Dashboard" element={<Dashboard />}>
              <Route
                path="AppointmentHistory"
                element={<AppointmentHistory />}
              />
              <Route path="ReviewHistory" element={<ReviewHistory />} />
            </Route>
            <Route path="/Login" element={<Login />} />
            <Route
              path="/PetOwnerProfileForm"
              element={<PetOwnerProfileForm />}
            />
            <Route path="/BookingForm" element={<BookingForm />} />
            <Route path="/MyReviewsList" element={<MyReviewsList />} />
            <Route
              path="/UpdateMyProfileForm"
              element={<UpdateMyProfileForm />}
            />
            <Route path="/UpdateProfile" element={<UpdateProfile />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/ProfileForm" element={<ProfileForm />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/ContactModal" element={<ContactModal />} />
            <Route path="/PetProfileForm" element={<PetProfileForm />} />
            <Route path="/ReviewForm" element={<ReviewForm />} />
            <Route
              path="/UpcomingAppointments"
              element={<UpcomingAppointments />}
            />
            <Route path="/About" element={<About />} />
            <Route path="/AllReviews" element={<AllReviews />} />
            <Route path="/MyProfile" element={<MyProfile />} />
            <Route path="/Test" element={<Test />} />
            {/* <Route path="*" element={<NoPageFound />} /> */}
          </Routes>
        </Router>
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;

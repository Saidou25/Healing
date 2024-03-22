import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  defaultDataIdFromObject,
} from "@apollo/client";
import "bootswatch/dist/lux/bootstrap.min.css";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { UserProvider } from "./context/userContext";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./components/About";
import Dashboard from "./pages/Dashboard";
import Book from "./features/Appointments/Book";
import AppointmentReview from "./features/Appointments/AppointmentReview";
import ProfileForm from "./features/Profile/ProfileForm";
import Profile from "./features/Profile";
import UpdateMyProfileForm from "./components/UpdateMyProfileForm";
import UpdateProfile from "./components/UpdateProfile";
import ReviewForm from "./features/Reviews/ReviewForm";
import AppointmentHistory from "./features//Appointments/AppointmentHistory";
import BookingSuccess from "./features/Appointments/BookingSuccess";
import ReviewHistory from "./components/ReviewHistory";
import PageNotFound from "./components/PageNotFound";

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
      {/* <UserProvider> */}
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />

          <Route path="/About" element={<About />} />
          <Route path="/Profile" element={<Profile />} />

          <Route path="/Dashboard" element={<Dashboard />}>
            <Route path="AppointmentHistory" element={<AppointmentHistory />} />
            <Route path="ReviewHistory" element={<ReviewHistory />} />
          </Route>

          <Route path="/Book" element={<Book />}>
            <Route path="BookingSuccess" element={<BookingSuccess />} />
            <Route path="ProfileForm" element={<ProfileForm />} />
            <Route path="AppointmentReview" element={<AppointmentReview />} />
          </Route>

          <Route
            path="/UpdateMyProfileForm"
            element={<UpdateMyProfileForm />}
          />
          <Route path="/UpdateProfile" element={<UpdateProfile />} />
          <Route path="/ReviewForm" element={<ReviewForm />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      {/* </UserProvider> */}
    </ApolloProvider>
  );
}

export default App;

import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
}
  from '@apollo/client';
import 'bootswatch/dist/lux/bootstrap.min.css';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ProfileForm from './components/ProfileForm';
import PetProfileForm from './components/PetProfileForm';
import PetOwnerProfileForm from './components/PetOwnerProfileForm';
import ReviewForm from './components/ReviewForm';
import MyReviewsList from './components/MyReviewsList';
import Appointment from './components/Appointment';
import AppointmentHistory from './components/AppointmentHistory';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import UpcomingAppointments from './components/UpcomingAppointments';
import Confirmation from './components/Confirmation';
import AppointmentForm from './components/AppointmentForm';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import MyProfile from './pages/MyProfile';
import Profile from './components/Profile';
import ContactModal from './components/ContactModal';
import UpdateMyProfileForm from './components/UpdateMyProfileForm';
import UpdateProfile from './components/UpdateProfile';
import About from './components/About';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',

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
          }
        },
        bookingdates: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  },
});

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
            <Route path='/Login' element={<Login />} />
            <Route path='/UpcomingAppointments' element={<UpcomingAppointments />} />
            <Route path='/PetOwnerProfileForm' element={<PetOwnerProfileForm />} />
            <Route path='/MyReviewsList' element={<MyReviewsList />} />
            <Route path='/UpdateMyProfileForm' element={<UpdateMyProfileForm />} />
            <Route path='/UpdateProfile' element={<UpdateProfile />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/Confirmation' element={<Confirmation />} />
            <Route path='/AppointmentForm' element={<AppointmentForm />} />
            <Route path='/ProfileForm' element={<ProfileForm />} />
            <Route path='/Appointment' element={<Appointment />} />
            <Route path='/AppointmentHistory' element={<AppointmentHistory />} />
            <Route path='/Profile' element={<Profile />} />
            <Route path='/ContactModal' element={<ContactModal />} />
            <Route path='/PetProfileForm' element={<PetProfileForm />} />
            <Route path='/ReviewForm' element={<ReviewForm />} />
            <Route path='/Dashboard' element={<Dashboard />} />
            <Route path='/About' element={<About />} />
            <Route path='/MyProfile' element={<MyProfile />} />
            <Route path='/' element={<LandingPage />} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;

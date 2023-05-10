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
import ReviewForm from './components/ReviewForm';
import UserList from './components/UserList';
import MyReviewsList from './components/MyReviewsList';
import Login from './components/Login';
import LandingPage from './pages/LandingPage';
import MyAppointmentsList from './components/MyAppointmentsList';
import AppointmentConfirmation from './components/AppointmentConfirmation';
import AppointmentForm from './components/AppointmentForm';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import MyProfile from './pages/MyProfile';
import UpdateMyProfile from './components/UpdateMyProfile';
import About from './components/About';
import Note from './components/Note';
import UpdateNote from './components/UpdateNote';



const httpLink = createHttpLink({
  uri: '/graphql',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',

    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          reviews: {
            merge(existing, incoming) {
              return incoming;
            }
          }
        }
      }
    }

  })
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Routes>
            <Route path='/UserList' element={<UserList />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/MyAppointmentsList' element={<MyAppointmentsList />} />
            <Route path='/MyReviewsList' element={<MyReviewsList />} />
            <Route path='/UpdateMyProfile' element={<UpdateMyProfile />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/AppointmentConfirmation' element={<AppointmentConfirmation />} />
            <Route path='/AppointmentForm' element={<AppointmentForm />} />
            <Route path='/ProfileForm' element={<ProfileForm />} />
            <Route path='/PetProfileForm' element={<PetProfileForm />} />
            <Route path='/ReviewForm' element={<ReviewForm />} />
            <Route path='/Dashboard' element={<Dashboard />} />
            <Route path='/Note' element={<Note />} />
            <Route path='/UpdateNote' element={<UpdateNote />} />
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

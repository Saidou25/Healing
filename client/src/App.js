import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import LandingPage from './pages/LandingPage'
import BookingDate from './components/Visit';
import AppointmentForm from './components/AppointmentForm'
import Visit from './components/Visit'
// import DateList from './components/DateList'


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache({ addTypename: false }),
});


function App() {
  return (
    <ApolloProvider client={client}>
       <Router>
      <>
        <Header />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/Visit' element={<Visit />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Navbar' element={<Navbar />} />
          <Route path='/BookingDate' element={<BookingDate />} />
          <Route path='/AppointmentForm' element={<AppointmentForm />} />
          <Route path='/' element={<LandingPage />} />
        </Routes>
      </>
      </Router>
    </ApolloProvider>
  );
}

export default App;

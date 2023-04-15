import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import LandingPage from './pages/LandingPage';
import VisitorAppointment from './components/VisitorAppointment';
import Visit from './components/Visit';
import DateList from './components/DateList';
import AppointmentConfirmation from './components/AppointmentConfirmation';
import PetAppointment from './components/PetAppointment';


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
         <Route path='/DateList' element={<DateList />} />
          <Route path='/VisitorAppointment' element={<VisitorAppointment />} />
          <Route path='/AppointmentConfirmation' element={<AppointmentConfirmation />} />
          <Route path='/PetAppointment' element={<PetAppointment />} />
          <Route path='/' element={<LandingPage />} />
        </Routes>
      </>
      </Router>
    </ApolloProvider>
  );
}

export default App;

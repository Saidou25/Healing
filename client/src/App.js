import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Info from './components/Info';
import PatientList from './components/PatientList'


const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
       <Router>
      <>
        <Header />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/Info' element={<Info />} />
          <Route path='/Navbar' element={<Navbar />} />
          <Route path='/PatientList' element={<PatientList />} />
        </Routes>
      </>
      </Router>
    </ApolloProvider>
  );
}

export default App;

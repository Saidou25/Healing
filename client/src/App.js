import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/Header';
import Navbar from './components/Navbar';
import Info from './components/Info';

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
          <Route path='/Info' element={<Info />} />
          <Route path='/Navbar' element={<Navbar />} />
        </Routes>
      </>
      </Router>
    </ApolloProvider>
  );
}

export default App;

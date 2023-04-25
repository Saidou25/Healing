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

// import Header from './components/Header';
// import Navbar from './components/Navbar';
import UserList from './components/UserList';
import Login from './components/Login';
import LandingPage from './pages/LandingPage';
import Info from './components/Info';
import DateList from './components/DateList';
import AppointmentConfirmation from './components/AppointmentConfirmation';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import About from './components/About';



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
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          {/* <Header /> */}
          <Routes>
            <Route path='/UserList' element={<UserList />} />
            <Route path='/Login' element={<Login />} />
            {/* <Route path='/Navbar' element={<Navbar />} /> */}
            <Route path='/DateList' element={<DateList />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/Info' element={<Info />} />
            <Route path='/AppointmentConfirmation' element={<AppointmentConfirmation />} />
            <Route path='/Dashboard' element={<Dashboard />} />
            <Route path='/About' element={<About />} />
            <Route path='/Profile' element={<Profile />} />
            <Route path='/' element={<LandingPage />} />
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/router/ProtectedRoute';
import { UserContextProvider } from '../contexts/UserContext';
import Authentication from '../pages/Authentication';
import Home from '../pages/Home';
import Registration from '../pages/Registration';

const App = props => 
    <UserContextProvider>
      <Routes>
          <Route exact path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Authentication />} />
          <Route path="/register" element={<Registration />} />
      </Routes>
    </UserContextProvider>

export default App

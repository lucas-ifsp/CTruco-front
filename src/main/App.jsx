import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/router/ProtectedRoute';
import Home from '../pages/Home';
import Registration from '../pages/Registration';
import SignIn from '../pages/SignIn';

const App = props => 
    <Routes>
        <Route exact path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Registration />} />
    </Routes>

export default App

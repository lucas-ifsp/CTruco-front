import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/router/ProtectedRoute';
import { GameContextProvider } from "../contexts/GameContext";
import { UserContextProvider } from '../contexts/UserContext';
import Authentication from '../pages/authentication/Authentication';
import Home from '../pages/home/Home';
import Registration from '../pages/registration/Registration';


const App = props => 
    <UserContextProvider>
    <GameContextProvider>
       <Routes>
            <Route exact path="/" element={
              <ProtectedRoute>
                  <Home />
              </ProtectedRoute>
            } />
          <Route path="/login" element={<Authentication />} />
          <Route path="/register" element={<Registration />} />
       </Routes>
    </GameContextProvider>
    </UserContextProvider>

export default App

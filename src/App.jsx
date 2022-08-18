import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './components/router/RequireAuth';
import { AuthContextProvider } from './contexts/AuthContext';
import { IntelContextProvider } from "./contexts/IntelContext";
import Authentication from './pages/authentication/Authentication';
import NotFound from './pages/error/NotFound';
import Home from './pages/home/Home';
import Layout from './pages/main/Layout';
import Registration from './pages/registration/Registration';

const App = () => 
    <AuthContextProvider>
    <IntelContextProvider>
       <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="login" element={<Authentication />} />
                <Route path="register" element={<Registration />} />
                <Route element={<RequireAuth />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>
       </Routes>
    </IntelContextProvider>
    </AuthContextProvider>

export default App

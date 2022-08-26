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

// TODO 
// 1. Solve opponent card showing covered before unveiled. 
// 2. Implement feature to notify player about leaving active game
// 3. Implement feature to remove active game if player leaves 
// 4. Solve problem of overflow in long usernames and put a limit in name length
// 5. Implement responsive layout
// 6. Implement microstream to handle active games
// 7. Implement hall of fame
// 8. Implement player history

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


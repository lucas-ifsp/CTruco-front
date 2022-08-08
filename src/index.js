import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/router/ProtectedRoute';
import './index.css';
import App from "./main/App";
import Registration from './pages/Registration';
import SignIn from './pages/SignIn';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </Router>
  </React.StrictMode>
);


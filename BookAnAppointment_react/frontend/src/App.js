import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './components/Home';
import Auth from './components/Auth';
import Dashbaord from './components/Dashbaord';
import Reports from './components/Reports';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/signup" element={<Auth type="signup" />} />
                <Route exact path="/signin" element={<Auth type="signin" />} />
                <Route exact path="/dashboard" element={<Dashbaord />} />
                <Route exact path="/report" element={<Reports />} />
            </Routes>
        </Router>
    )
}

export default App;

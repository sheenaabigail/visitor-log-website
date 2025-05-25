import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Navbar from './components/navbar';
import PrivateRoute from './components/privateRoute';
import LandingPage from './pages/landingPage';
import VisitorLog from './pages/visitorLog';
import VisitorLogin from './pages/visitorLogin';
import VisitorList from './pages/visitorList';
import Signup from './pages/signup';
import Sample from './pages/Sample';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
                <Route path="/visitor-login" element={<VisitorLogin />} />

        <Route path="/signup" element={<Signup/>} />
        <Route
          path="/visitorlog"
          element={
            <PrivateRoute>
              <VisitorLog />
              {/* <VisitorList></VisitorList> */}
            </PrivateRoute>
          }
        />
        <Route
          path="/visitorlist"
          element={
            <PrivateRoute>
              {/* <VisitorLog /> */}
              <VisitorList></VisitorList>
            </PrivateRoute>
          }
        />
           <Route path="/sample" element={<Sample/>} />

      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import LandingPage from './pages/LandingPage';
import TeacherRegistration from './pages/TeacherRegistration';
import StudentBrowse from './pages/StudentBrowse';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/teacher-registration" element={<TeacherRegistration />} />
        <Route path="/student-browse" element={<StudentBrowse />} />
      </Routes>
    </Router>
  );
}

export default App;
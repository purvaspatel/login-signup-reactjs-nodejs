import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold">Welcome to the University Portal</h1>
      <p className="mt-4">Navigate to the sections using the links below:</p>
      <div className="mt-4 space-x-4">
        <Link to="/teacher-registration" className="text-blue-500 hover:underline">Teacher Registration</Link>
        <Link to="/student-browse" className="text-blue-500 hover:underline">Browse Teachers</Link>
      </div>
    </div>
  );
}

export default LandingPage;

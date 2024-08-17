import React, { useState } from 'react';

function TeacherRegistration() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [photo, setPhoto] = useState(null);
  const [cabinNumber, setCabinNumber] = useState('');
  const [availableSlots, setAvailableSlots] = useState({
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
  });

  const handleNext = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSlotChange = (day, time) => {
    const updatedSlots = { ...availableSlots };
    if (updatedSlots[day].includes(time)) {
      updatedSlots[day] = updatedSlots[day].filter((slot) => slot !== time);
    } else {
      updatedSlots[day].push(time);
    }
    setAvailableSlots(updatedSlots);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('department', department);
    formData.append('cabinNumber', cabinNumber);
    formData.append('availableSlots', JSON.stringify(availableSlots));
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const response = await fetch('http://localhost:5000/api/teachers', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Teacher registered:', data);
        // Reset the form
        setName('');
        setEmail('');
        setDepartment('');
        setCabinNumber('');
        setAvailableSlots({
          Mon: [],
          Tue: [],
          Wed: [],
          Thu: [],
          Fri: [],
        });
        setPhoto(null);
        setStep(1);
      } else {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (step === 1) {
    return (
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-4xl font-bold text-center mb-6">Teacher Registration</h1>
        <form onSubmit={handleNext} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="ICT">ICT</option>
              <option value="E.C">E.C</option>
              <option value="Chemical">Chemical</option>
              <option value="Mechanical">Mechanical</option>
              {/* Add more departments as needed */}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Upload Photo</label>
            <input
              type="file"
              onChange={handlePhotoChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Next
          </button>
        </form>
      </div>
    );
  }

  if (step === 2) {
    const times = ['9-10', '10-11', '11-12', '12-1', '1-2', '2-3', '3-4', '4-5', '5-6'];
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

    return (
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-4xl font-bold text-center mb-6">Availability & Cabin Number</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Cabin Number</label>
            <input
              type="text"
              value={cabinNumber}
              onChange={(e) => setCabinNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Available Slots</label>
            <div className="grid grid-cols-10 gap-1 text-center">
              <div></div> {/* Empty cell in the top-left corner */}
              {times.map((time) => (
                <div key={time} className="font-semibold">{time}</div>
              ))}
              {days.map((day) => (
                <React.Fragment key={day}>
                  <div className="font-semibold">{day}</div>
                  {times.map((time) => (
                    <div
                      key={time}
                      className={`w-10 h-10 border flex justify-center items-center cursor-pointer ${availableSlots[day].includes(time) ? 'bg-green-500 text-white font-bold' : ''}`}
                      onClick={() => handleSlotChange(day, time)}
                    >
                      {availableSlots[day].includes(time) ? '✔' : ''}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  return null; // If step isn't 1 or 2, don't render anything
}

export default TeacherRegistration;


import React, { useState } from 'react';

export default function Name() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <div className="name-container">
      <h2 className="welcome">Welcome to CHARUSAT!!!</h2>

      <form className="name-form" onSubmit={(e) => e.preventDefault()}>
        <div className="input-row">
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="input-row">
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="off"
          />
        </div>
      </form>

      <div className="output-row">
        <div>
          First Name: <span className="output-value">{firstName}</span>
        </div>
        <div>
          Last Name: <span className="output-value">{lastName}</span>
        </div>
      </div>
    </div>
  );
}

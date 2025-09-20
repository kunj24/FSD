import React from 'react';
import Counter from './Components/Counter';
import Name from './Components/name';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Counter />
      <hr />
      <Name />
    </div>
  );
}

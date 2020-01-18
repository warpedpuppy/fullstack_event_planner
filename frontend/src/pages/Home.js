import React from 'react';
import './Home.css';
import AllEvents from '../components/events/AllEvents';

export default function Home() {
  return (
    <div>
      <div className="home-background" />
      <AllEvents />
    </div>
  );
}

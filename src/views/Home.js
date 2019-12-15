import React from 'react'
import { Link } from 'react-router-dom';
import Container from '../components/Container';

const Home = () => {
  return (
    <Container>
        <div className="flex flex-col justify-center items-center">
          <Link className="font-bold tracking-wide bg-green-400 text-black px-8 py-2 text-2xl mb-4 focus:outline-yellow" to="/start">Start</Link>
          <div className="flex">
            <Link className="text-blue-400 underline hover:text-blue-500 focus:outline-yellow px-2" to="/words">Manage words</Link>
            <Link className="text-blue-400 underline hover:text-blue-500 focus:outline-yellow px-2" to="/settings/voice">Voice settings</Link>
          </div>
        </div>
    </Container>
  );
}

export default Home

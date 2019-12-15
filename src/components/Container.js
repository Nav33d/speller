import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav className="bg-black text-white p-4 mb-8">
        <h1 className="text-3xl uppercase font-black tracking-wider"><Link className="focus:outline-yellow" to="/">Speller</Link></h1>
      </nav>
    </header>
  )
}

const Main = ({ children }) => {
  return (
    <main className="px-4">{ children }</main>
  )
}

const Footer = () => {
  return (
    <footer className="flex justify-center pt-8 pb-4">
      <p className="text-xs text-gray-500">
        Made by <a className="text-blue-500 underline hover:text-blue-600 focus:outline-yellow" target="_blank" rel="noopener noreferrer" href="https://naveedziarab.co.uk">Naveed</a>
      </p>
    </footer>
  );
}

const Container = ({ children }) => {
  return (
    <div className="container mx-auto bg-white w-2/3">
      <Header />
      <Main>
        { children}
      </Main>
      <Footer />
    </div>
  );
}

export default Container;
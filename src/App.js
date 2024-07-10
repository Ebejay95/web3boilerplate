import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';

function Nav() {
  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname === path ? 'text-red-500' : '';
  };

  return (
    <nav>
      <ul className="flex space-x-4">
        <li>
          <Link
            to="/"
            className={getLinkClass('/')}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={getLinkClass('/about')}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={getLinkClass('/contact')}
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header bg-blue-500 text-white p-4">
          <h1 className="text-2xl font-bold">Project</h1>
          <Nav />
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;

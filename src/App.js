import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import contracts, { loadContracts } from './contracts';
import MetaMaskChecker from './components/MetaMaskChecker';

function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        await loadContracts();
        const Counter = contracts['Counter'];
        const response = await Counter.incrementCount();
        setResult(response);
      } catch (err) {
        setError('Error loading contracts: ' + err.message);
      }
    };
    init();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Edit <code>src/App.js</code> and save to reload.</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <MetaMaskChecker />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {result ? <p>Result: {result}</p> : <p>Loading...</p>}
      </header>
    </div>
  );
}

export default App;

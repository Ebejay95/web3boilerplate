import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ethers } from 'ethers';
import { Counter_abi, Counter_address } from './contract.config';
import MetaMaskChecker from './components/MetaMaskChecker';

function App() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.BrowserProvider(window.ethereum);
          const contract = new ethers.Contract(Counter_address, Counter_abi, provider);

          // Load the initial count value
          const initialCount = await contract.count();
          setResult(initialCount.toNumber());
        } catch (err) {
          setError('Error loading contracts: ' + err.message);
        }
      } else {
        setError('MetaMask is not installed. Please install it to use this app.');
      }
    };
    init();
  }, []);

  const incrementCount = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();

        const contract = new ethers.Contract(Counter_address, Counter_abi, signer);

        const tx = await contract.incrementCount();
        await tx.wait();

        const updatedCount = await contract.count();
        setResult(updatedCount.toNumber());
      } catch (err) {
        setError('Error incrementing count: ' + err.message);
      }
    }
  };

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
        {result !== null ? <p>Counter: {result}</p> : <p>Loading...</p>}
        <button onClick={incrementCount}>Increment Count</button>
      </header>
    </div>
  );
}

export default App;

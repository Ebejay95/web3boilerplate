// Home.js
import React, { useEffect, useState } from 'react';
import MetaMaskChecker from '../MetaMaskChecker';
import { ethers } from 'ethers';
import { Counter_abi, Counter_address } from './../../contract.config';
import Fruits from './../Fruits';
import FruitForm from './../FruitForm';

// Einfache Implementierung des FNV-1a Hash-Algorithmus
function fnv1aHash(string) {
	let hash = 2166136261;
	for (let i = 0; i < string.length; i++) {
	  hash ^= string.charCodeAt(i);
	  hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
	}
	return hash >>> 0;
  }
  
  function stringToInt(string) {
	// Erstelle einen Hash des Strings
	const hash = fnv1aHash(string);
	
	// Bringe den Wert in den Bereich 1 bis 16
	return (hash % 16) + 1;
  }
function Home() {
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);
	const [fruits, setFruits] = useState([{name: "apple"}, {name: "banana"}]);
	const [address, setAddress] = useState(null);

	const addFruit = (fruit) => {
		setFruits([...fruits, fruit]);
	};

	useEffect(() => {
		const init = async () => {
			if (window.ethereum) {
				try {
					const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
					const provider = new ethers.BrowserProvider(window.ethereum);
					const contract = new ethers.Contract(Counter_address, Counter_abi, provider);

					// Save the public address of the wallet
					setAddress(accounts[0]);

					// Load the initial count value
					const initialCount = await contract.count();
					setResult(initialCount.toString());
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
				console.log(updatedCount.toString());
				setResult(updatedCount.toString());
			} catch (err) {
				setError('Error incrementing count: ' + err.message);
			}
		}
	};

	return (
		<div>
			<MetaMaskChecker />
			{error && <p className="text-red-500">{error}</p>}
			{result !== null ? <p className="mt-2 text-lg">Counter: {result}</p> : <p className="mt-2 text-lg">Loading...</p>}
			<button 
				onClick={incrementCount} 
				className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
			>
				Increment Count
			</button>
			{address && <p className="mt-2 text-lg">Connected Wallet Address: {address}</p>}
			{address && <p className="mt-2 text-lg">Connected Wallet Addresspic: {stringToInt(address)}</p>}
			<FruitForm addFruit={addFruit} />
			<Fruits fruits={fruits} />
		</div>
	);
}

export default Home;
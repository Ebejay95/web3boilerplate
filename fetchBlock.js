const axios = require('axios');
const { ethers } = require('ethers');

// Adresse des Contracts
const CONTRACT_ADDRESS = '0x376B025b275100435f54B4fF78Da3DF3A53F59da';

// ABI des Contracts
const abi = [
  "function count() view returns (uint)",
  "function incrementCount() public"
];

// Verbinde dich mit dem Ethereum-Netzwerk (z.B. über Infura)
const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');

// Erstelle eine Instanz des Contracts
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

// API-URL für Transaktionsdaten
const API_URL = `https://eth-sepolia.blockscout.com/api/v2/addresses/${CONTRACT_ADDRESS}/transactions`;

// Funktion zum Abrufen der Transaktionen
async function fetchTransactions() {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'Accept': 'application/json'
      }
    });

    const transactions = response.data.items;
    for (const tx of transactions) {
      if (tx.raw_input) {
        decodeInput(tx.raw_input, tx.hash);
      }
    }

  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
  }
}

// Funktion zum Dekodieren der Eingabedaten und Abrufen des Contract-Zustands
async function decodeInput(rawInput, txHash) {
  const iface = new ethers.utils.Interface(abi);
  try {
    const decodedData = iface.parseTransaction({ data: rawInput });
    console.log(`Transaktion: ${txHash}`);
    console.log('Dekodierte Eingabedaten:', decodedData);

    // Abrufen des aktuellen Werts der count-Variable
    const count = await contract.count();
    console.log('Aktueller Wert im Contract (count):', count.toString());
    console.log('---');

  } catch (error) {
    console.error('Fehler beim Dekodieren der Eingabedaten:', error);
  }
}

// Aufruf der Funktion
fetchTransactions();
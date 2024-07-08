import Web3 from 'web3';

// Stelle eine Verbindung zu einem Ethereum-Knoten her
const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

// Contract-Adresse und ABI
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const abi = [/* YOUR_CONTRACT_ABI */];

// Erstelle eine Contract-Instanz
const contract = new web3.eth.Contract(abi, contractAddress);

// Funktion auf dem Contract aufrufen
async function callContractFunction() {
    const accounts = await web3.eth.requestAccounts();
    const result = await contract.methods.yourMethod().call({ from: accounts[0] });
    console.log(result);
}

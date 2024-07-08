import { ethers } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const contracts = {};

export const loadContracts = async () => {
    if (!window.ethereum) {
        throw new Error('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contractName = 'MyContract';
    const contractAddress = process.env[`REACT_APP_${contractName.toUpperCase()}_ADDRESS`];
    const abi = JSON.parse(process.env[`REACT_APP_${contractName.toUpperCase()}_ABI`]);

    if (!contractAddress || !abi) {
        throw new Error(`Contract address or ABI for ${contractName} is missing`);
    }

    contracts[contractName] = new ethers.Contract(contractAddress, abi, signer);
};

export default contracts;

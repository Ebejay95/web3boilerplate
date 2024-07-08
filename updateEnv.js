const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const contractDirectory = path.join(__dirname, 'artifacts/contracts');
const envFilePath = path.join(__dirname, '.env');

const updateEnvFile = (contractName, contractAddress, abi) => {
    let envConfig = {};
    if (fs.existsSync(envFilePath)) {
        envConfig = dotenv.parse(fs.readFileSync(envFilePath));
    }
    envConfig[`REACT_APP_${contractName.toUpperCase()}_ADDRESS`] = contractAddress;
    envConfig[`REACT_APP_${contractName.toUpperCase()}_ABI`] = JSON.stringify(abi);

    const envConfigStrings = Object.keys(envConfig).map(key => `${key}=${envConfig[key]}`).join('\n');
    fs.writeFileSync(envFilePath, envConfigStrings);
    console.log(`Updated .env with ${contractName} address and ABI`);
};

const getContractData = (contractFilePath, contractName) => {
    const contractData = JSON.parse(fs.readFileSync(contractFilePath, 'utf8'));
    console.log(`Loaded contract data for ${contractName}:`, contractData);
    const networks = Object.keys(contractData.networks);
    if (networks.length === 0) {
        throw new Error(`No deployed networks found for contract: ${contractName}`);
    }
    return {
        address: contractData.networks[networks[0]].address,
        abi: contractData.abi
    };
};

const main = () => {
    console.log('Running updateEnv.js');
    if (!fs.existsSync(contractDirectory)) {
        throw new Error(`Contract directory not found: ${contractDirectory}`);
    }

    const contractFiles = fs.readdirSync(contractDirectory);
    contractFiles.forEach(contractFile => {
        const contractPath = path.join(contractDirectory, contractFile);
        if (fs.lstatSync(contractPath).isDirectory()) {
            const contractName = path.basename(contractFile, '.sol');
            const contractJsonPath = path.join(contractPath, `${contractName}.json`);
            if (fs.existsSync(contractJsonPath)) {
                try {
                    const { address, abi } = getContractData(contractJsonPath, contractName);
                    updateEnvFile(contractName, address, abi);
                } catch (error) {
                    console.error(`Error processing contract ${contractJsonPath}: ${error.message}`);
                }
            } else {
                console.error(`Contract JSON file not found: ${contractJsonPath}`);
            }
        }
    });
};

main();

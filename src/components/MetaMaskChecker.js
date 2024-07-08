import React, { useEffect, useState } from 'react';

const loadBlockchainData = async (setError) => {
  const web3 = window.web3;
  const accounts = await web3.eth.getAccounts();
  if (accounts.length === 0) {
    setError('No accounts found. Please check MetaMask.');
  }
};

const detectBrowser = () => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Edge')) return 'Edge';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
  return 'Other';
};

const getExtensionLink = (browser) => {
  switch (browser) {
    case 'Chrome':
      return 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn';
    case 'Firefox':
      return 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/';
    case 'Edge':
      return 'https://microsoftedge.microsoft.com/addons/detail/metamask/blplhpclcehdnajacjagnbdhhaimkjbh';
    case 'Safari':
      return 'https://metamask.io/download.html'; // Safari is not officially supported yet, but MetaMask recommends using the download page
    default:
      return 'https://metamask.io/download.html';
  }
};

const MetaMaskChecker = () => {
  const [error, setError] = useState(null);
  const [extensionLink, setExtensionLink] = useState('');

  useEffect(() => {
    const initialize = async () => {
      const web3 = window.web3;
      if (web3) {
        await loadBlockchainData(setError);
      } else {
        const browser = detectBrowser();
        const link = getExtensionLink(browser);
        setExtensionLink(link);
        setError('MetaMask is not installed. Please install MetaMask to continue.');
      }
    };

    initialize();
  }, []);

  return (
    <div>
      {error ? (
        <div>
          <p>{error}</p>
          <a type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded" href={extensionLink} target="_blank" rel="noopener noreferrer">Install MetaMask</a>
        </div>
      ) : (
        <div>
          <p>Blockchain data loaded successfully.</p>
        </div>
      )}
    </div>
  );
};

export default MetaMaskChecker;

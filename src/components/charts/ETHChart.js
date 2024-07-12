import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { ethers } from 'ethers';
import axios from 'axios';
import { Counter_abi, Counter_address } from './../../contract.config';
import { getBSResItems } from '../../helpers/blockscoutHelpers';

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const ETHChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Counter',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const contract = new ethers.Contract(Counter_address, Counter_abi, provider);
          const API_URL = `https://eth-sepolia.blockscout.com/api/v2/addresses/${Counter_address}/transactions`;
          const jsonResponse = await axios.get(API_URL, {
            headers: {
              'Accept': 'application/json'
            }
          });

          const items = await getBSResItems(axios, ethers, jsonResponse, provider, contract);

          // Update the chart data
          const labels = items.map(item => new Date(item.timestamp).toLocaleString());
          const countData = items.map(item => parseInt(item.data_count, 10));

          setData({
            labels,
            datasets: [
              {
                label: 'Counter',
                data: countData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          });

        } catch (err) {
          console.error('Error loading contracts: ', err.message);
        }
      } else {
        console.error('MetaMask is not installed. Please install it to use this app.');
      }
    };

    init();
  }, []);

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ETHChart;
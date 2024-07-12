const axios = require('axios');

// Funktion zum Abrufen der Blockdaten
async function fetchBlocks() {
  const url = 'https://eth.blockscout.com/api/v2/blocks';

  try {
    const response = await axios.get(url, {
      params: {
        type: 'block'  // Du kannst hier auch 'uncle' oder 'reorg' angeben
      },
      headers: {
        'Accept': 'application/json'
      }
    });

    // Ausgabe der erhaltenen Daten
    console.log(response.data);

  } catch (error) {
    console.error('Fehler beim Abrufen der Daten:', error);
  }
}

// Aufruf der Funktion
fetchBlocks();


export async function getBSResItems(axios, ethers, jsonResponse, provider, contract) {
	let items = [];
	if (jsonResponse.data) {
	  if (jsonResponse.data.items) {
		for (let item of jsonResponse.data.items) {
		  const txHash = item.hash;
  
		  // Fetch logs for the transaction
		  console.warn(`https://eth-sepolia.blockscout.com/api/v2/transactions/${txHash}/logs`)
		  const logsURL = `https://eth-sepolia.blockscout.com/api/v2/transactions/${txHash}/logs`;
		  const logsResponse = await axios.get(logsURL, {
			headers: {
			  'Accept': 'application/json'
			}
		  });
  
		  // Filter for the CountChanged event and decode the count value
		  const countChangedLog = logsResponse.data.items.find(log => {
			return log.topics[0] === ethers.utils.id("CountChanged(uint256)");
		  });
		  console.log(countChangedLog)
		  if (countChangedLog) {
			const decodedData = ethers.utils.defaultAbiCoder.decode(
			  ['uint256'],
			  countChangedLog.data
			);
			item.count = decodedData[0].toString();
		  } else {
			item.count = null; // or handle the case when there's no CountChanged event
		  }
  
		  items.push(item);
		}
	  }
	}
	console.warn(items);
	return items;
  }
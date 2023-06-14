import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [tokenId, setTokenId] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [nftData, setNftData] = useState(null);

  const fetchNFTData = async () => {
    const options = {
      method: 'GET',
      url: `http://localhost:8080/v1/nfts/contract/${contractAddress}/token/${tokenId}?chain=eth-main`,
      headers: {accept: 'application/json', 'X-API-KEY': '2jhzbqIWanB8puiqySBIWJVf6Ovp7oPW'}
    };

    const response = await axios.request(options);
    setNftData(response.data);
  };

  return (
    <div className="App">
      <h1>NFT Price Checker</h1>
      <div className="inputContainer">
        <input 
          type="text"
          placeholder="Token ID"
          value={tokenId}
          onChange={e => setTokenId(e.target.value)}
        />
        <input 
          type="text"
          placeholder="Contract Address"
          value={contractAddress}
          onChange={e => setContractAddress(e.target.value)}
        />
        <button onClick={fetchNFTData}>Check Price</button>
      </div>
      {nftData && (
        <div className="nftData">
          <img src={nftData.cached_images.small_250_250} alt={nftData.token_name} />
          <h2>{nftData.token_name}</h2>
          <p>{nftData.recent_price.price} ETH</p>
        </div>
      )}
    </div>
  );
}

export default App;
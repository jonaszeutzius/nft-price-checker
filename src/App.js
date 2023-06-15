import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [tokenId, setTokenId] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [blockchain, setBlockchain] = useState('eth-main');
  const [nftData, setNftData] = useState(null);

  const fetchNFTData = async () => {
    const options = {
      method: 'GET',
      url: `http://localhost:8080/v1/nfts/contract/${contractAddress}/token/${tokenId}?chain=${blockchain}`,
      headers: {accept: 'application/json', 'X-API-KEY': '2jhzbqIWanB8puiqySBIWJVf6Ovp7oPW'}
    };

    const response = await axios.request(options);
    setNftData(response.data);
  };

  const handleBlockchainChange = (event) => {
    setBlockchain(event.target.value);
  };

  return (
    <div className="App">
      <h1 className='title'>NFT Price Checker</h1>
      <p>Input NFT token ID and contract address below to see recent transaction price.</p>
      <div className="inputContainer">
        <input 
          type="text"
          placeholder="Contract Address"
          value={contractAddress}
          onChange={e => setContractAddress(e.target.value)}
        />
        <input 
          type="text"
          placeholder="Token ID"
          value={tokenId}
          onChange={e => setTokenId(e.target.value)}
        />
        <select name='blockchain' value={blockchain} onChange={handleBlockchainChange}>
          <option value="eth-main">eth-main</option>
          <option value="arbitrum-main">arbitrum-main</option>
          <option value="optimism-main">optimism-main</option>
          <option value="poly-main">poly-main</option>
          <option value="bsc-main">bsc-main</option>
          <option value="eth-goerli">eth-goerli</option>
          {console.log('This is the blockchain:' + blockchain)}
        </select>
        <button onClick={fetchNFTData}>Check Price</button>
      </div>
      
      {nftData && (
      <div className="nftData">
        <h2>{nftData.name}</h2>
        <div className="imageContainer">
          <img className="image" src={nftData.cached_images.medium_500_500} alt={nftData.name} />
        </div>
        <p className='message'>
          Id: {nftData.id} | 
          Token Name: {nftData.token_name} | 
          {(nftData.rarity_rank)? `Rarity: ${nftData.rarity_rank} | ` : " "}
          Recent Price: ${parseFloat(nftData.recent_price.price_usd).toFixed(2)} {`(${nftData.recent_price.price} ${nftData.recent_price.price_currency})`}
        </p>
      </div>
      )}
    </div>
  );
}

export default App;
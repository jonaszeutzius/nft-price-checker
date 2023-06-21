import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [tokenId, setTokenId] = useState('');
  const [contractAddress, setContractAddress] = useState('');
  const [blockchain, setBlockchain] = useState('eth-main');
  const [nftData, setNftData] = useState(null);
  const [error, setError] = useState(null);

  const fetchNFTData = async () => {
    const options = {
      method: 'GET',
      url: `http://localhost:8080/v1/nfts/contract/${contractAddress}/token/${tokenId}?chain=${blockchain}`,
      headers: { accept: 'application/json', 'X-API-KEY': '2jhzbqIWanB8puiqySBIWJVf6Ovp7oPW' }
    };

    try {
      const response = await axios.request(options);
      setNftData(response.data);
      setError(null);
    } catch (error) {
      setError('Error: Verify chain, contract address, and token ID are all valid!');
    }
  };

  const handleBlockchainChange = (event) => {
    setBlockchain(event.target.value);
  };

  const checkData = (data) => (data ? data : 'N/A');

  return (
    <div className="App">
      <h1 className="title">NFT Price Checker</h1>
      <p>Select a chain and input contract address and NFT token ID below to see recent transaction price.</p>
      <div className="inputContainer">
        <select name="blockchain" value={blockchain} onChange={handleBlockchainChange}>
          <option value="eth-main">eth-main</option>
          <option value="arbitrum-main">arbitrum-main</option>
          <option value="optimism-main">optimism-main</option>
          <option value="poly-main">poly-main</option>
          <option value="bsc-main">bsc-main</option>
          <option value="eth-goerli">eth-goerli</option>
        </select>
        <input
          type="text"
          placeholder="Contract Address"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
        <button onClick={fetchNFTData}>Check Price</button>
      </div>

      {error ? (
        <p className="errorMessage">{error}</p>
      ) : nftData && (
        <div className="nftData">
          <h2>{nftData.name}</h2>
          <div className="imageContainer">
            {nftData.cached_images && nftData.cached_images.medium_500_500 ? (
              <img 
                className="image" 
                src={nftData.cached_images.medium_500_500} 
                alt={nftData.name} />
            ) : (
              <div className='message'>
                Image not available.
              </div>
            )}
          </div>
          <p className="message">
            Id: {checkData(nftData.id)} | 
            Token Name: {checkData(nftData.token_name)} | 
            Rarity: {checkData(nftData.rarity_rank)} | 
            Recent Price USD: {nftData.recent_price && nftData.recent_price.price_usd ? parseFloat(nftData.recent_price.price_usd).toFixed(2) : 'N/A'} |   
            Recent Price Native Currency: {nftData.recent_price && nftData.recent_price.price ? 
              `${parseFloat(nftData.recent_price.price).toFixed(5)} ${nftData.recent_price.price_currency}` : 
              'N/A'}
          </p>
          <table>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th>Name</th>
                <th>Token Type</th>
                <th>Contract Address</th>
                <th>Rarity Rank</th>
                <th>Rarity Score</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <td>{checkData(nftData.token_name)}</td>
                <td>{checkData(nftData.token_type)}</td>
                <td>{checkData(nftData.contract_address)}</td>
                <td>{checkData(nftData.rarity_rank)}</td>
                <td>{checkData(nftData.rarity_score)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default App;

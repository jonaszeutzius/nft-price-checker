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
      console.log('response', response);
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
      {console.log(nftData)}

      {error ? (
        <p className="errorMessage">{error}</p>
      ) : nftData && (
        <div className="nftData">
          <h2>{nftData.name}</h2>
          <div className="imageContainer">
            <img className="image" src={nftData.cached_images.medium_500_500} alt={nftData.name} />
          </div>
          <p className="message">
            Id: {nftData.id} | Token Name: {nftData.token_name} |{' '}
            {nftData.rarity_rank ? `Rarity: ${nftData.rarity_rank} | ` : ''}
            Recent Price: ${parseFloat(nftData.recent_price.price_usd).toFixed(2)}{' '}
            ({`${nftData.recent_price.price} ${nftData.recent_price.price_currency}`})
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

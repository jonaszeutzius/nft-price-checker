# NFT PRICE CHECKER


## Using the Blockspan API with React to Display NFT Market Data

In the world of digital art and collectibles, Non-Fungible Tokens (NFTs) have taken center stage, creating a bustling market of unique digital assets. As enthusiasts, collectors, or developers, there's often a need to keep a pulse on the ever-changing market value of these unique tokens. Understanding this, wouldn't it be great if you could create an application to check the current market price of a specific NFT at your fingertips? With the Blockspan API and React, this isn't just possible — it's straightforward!

Blockspan API offers a wealth of data about NFTs. It's a treasure trove for developers who want to build applications around NFTs, whether it's for pricing, trading, analytics, or anything else you can imagine in the NFT space.

In this tutorial, we are going to create a simple web application using ReactJS, a popular front-end library, to interact with the Blockspan API. Our application will allow users to check the current market price of a specific NFT, as well as display some additional information such as the cached image and the name of the NFT.
Let's dive into the world of NFTs, powered by Blockspan API and brought to life with React!


## REQUIREMENTS:
- Node.js and npm installed on your system.
- Basic knowledge of React.js
- Blockspan API key


## STEP 1: SET UP YOUR REACT APPLICATION

First, you'll need to set up your React application. If you already have a React application set up, you can skip this step.

`npx create-react-app nft-price-checker`
`cd nft-price-checker`

This will create a new React application named `nft-price-checker` and navigate into the new directory.


## STEP 2: INSTALL AXIOS

We'll be using Axios to send HTTP requests to the Blockspan API. Install it with the following command:

`npm install axios`


## STEP 3: CREATE YOUR REACT COMPONENT

Next, you'll need to create a React component that uses the Blockspan API to fetch NFT data. Replace the existing src/App.js code with the following:

```
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
      headers: { accept: 'application/json', 'X-API-KEY': 'YOUR_BLOCKSPAN_API_KEY' }
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

```

Remember to replace `YOUR_BLOCKSPAN_API_KEY` with your actual Blockspan API key. 


## STEP 4: STYLE YOUR COMPONENT

To enhance the user interface in the browser, replace all code in the App.css file with the following:

```
.App {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  overflow-y: auto;
}

.title {
  margin-top: 20px;
  margin-bottom: 0;
  text-align: center;
}

.errorMessage {
  text-align: center;
  color: red;
  font-weight: bold;
}

.message {
  text-align: center;
}

.image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.inputContainer {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.inputContainer input {
  padding: 10px;
  font-size: 1em;
  width: 200px;
}

.inputContainer button {
  padding: 10px;
  font-size: 1em;
  background-color: #007BFF;
  color: white;
  border: none;
  cursor: pointer;
}

.inputContainer button:hover {
  background-color: #0056b3;
}

.imageContainer {
  display: flex;
  justify-content: center;
  width: 100%; 
}

.imageContainer img {
  width: 100%; 
  max-width: 500px;
  height: auto; 
}
.nftData {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.nftData .image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.nftData h2 {
  margin: 10px 0;
}

.nftData p {
  font-size: 1.2em;
  font-weight: bold;
}

td {
  padding: 10px;
  text-align: left;
}

th {
  padding: 10px;
  text-align: left;
}

.tableContainer {
  display: flex;
  justify-content: center;
}

```

Make sure to import this CSS file into your React component:

`import './App.css';`


## STEP 5: RUN YOUR APPLICATION

You can now run your React application with the following command:

`npm start`

This will start your React application and open it in your default web browser. You should see the following:
- A dropdown menu to select a blockchain
- Text boxes for contract address and token id
- A check price button

Input the data of the NFT and click the check price button. You should see an image of the NFT and some of its information including the price.

This wraps up our guide to creating an NFT Price Checking tool using the Blockspan API and React.js. Happy coding!


## APPENDIX: TROUBLESHOOTING COMMON ISSUES

1. CSS not taking effect: Make sure the CSS file is properly linked in your React component. If it is in the same directory, import it with `import './App.css';`. Class names in your JSX must match exactly with those in your CSS file (case-sensitive). If your styles still aren't being applied, try doing a hard refresh in your browser (Ctrl + F5 on most browsers) to clear the cache.

2. API request not working: Ensure you have replaced `'YOUR_BLOCKSPAN_API_KEY'` with your actual Blockspan API key in the Axios options. If the request still isn't working, check your console for any error messages.

3. NFT data not displaying: Make sure the properties you're accessing in the NFT data match exactly with those in the API response (case-sensitive). If the data still isn't displaying, try `console.log(response.data)` after the Axios request to inspect the structure of the API response.


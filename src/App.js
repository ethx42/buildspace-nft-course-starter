import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { v4 as uuid } from 'uuid';

import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import Loader from './components/Loader/Loader';
import TokenCard from './components/TokenCard/TokenCard';
import { connectContract } from './utils/connectContract';
import { MESSAGE, SOCIAL, CONTRACT } from './utils/constants';
import { askContractTo } from "./utils/askContractTo";
import { loadingAtom, currentAccountAtom, ethersAPIAtom } from './state';

const App = () => {
  const { ethereum, connectedContract } = connectContract(CONTRACT.ADDRESS);
  const [_, setEthersAPI] = useAtom(ethersAPIAtom);
  const [currentAccount, setCurrentAccount] = useAtom(currentAccountAtom);
  const [loadingMsg, setLoadingMsg] = useAtom(loadingAtom);
  const [collection, setCollection] = useState([]);

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) {
      console.log(MESSAGE.MISSING_METAMASK);
      return;
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      setCurrentAccount(account);
      setupEventListener();
    } else {
      console.error(MESSAGE.UNAUTHORIZED_ACCOUNT)
    }
  }

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert(MESSAGE.GET_METAMASK);
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
      setupEventListener();

    } catch (error) {
      console.error(error);
    }
  }

  const setupEventListener = async () => {
    try {
      if (ethereum) {
        console.log('event listener', connectedContract.on)
        connectedContract.on('NewEEALienNFTMinted', (from, tokenId, finalSvg) => {
          setCollection(arr => [...arr, { component: finalSvg, id: tokenId.toNumber() }]);
          console.log('collection', collection)
        });

        connectedContract.on('TotalSupply', (totalSupply) => {
          console.log('totalSupply' ,totalSupply);
        });

        connectedContract.on('OwnedItemsByAddress', (items) => {
          console.log('ownedItems -> ', items);
        });

        connectedContract.on('GetMetadata', (metadata) => {
          console.log('metadata' ,metadata);
        });

        connectedContract.on('NoMoreTokens', (data) => {
          console.log('NoMoreTokensEvent', data);
        });

        connectedContract.on('Transfer', (from, to, tokenId) => {
          console.log(`NFT with ID ${tokenId} transferred from ${from}, to ${to} succesfully`);
        });

      } else {
        console.error(MESSAGE.MISSING_ETHEREUM);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // const retrieveMyOwnedTokens = async () => {
  //   try {
  //     if (ethereum) {
  //       setLoading(true);
  //       const ownedTokens = await connectedContract.getMyOwnedTokens();
  //       await ownedTokens.wait();
  //       setLoading(false);
  //
  //     } else {
  //       console.error(MESSAGE.MISSING_ETHEREUM);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // }

  const mintERC721 = async () => {
    const nftTxn = await connectedContract.mintAnNFT();
    setLoadingMsg(MESSAGE.MINTING_NFT)
    await nftTxn.wait();
    console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
  }

  const mintNFT = () => askContractTo(mintERC721)({ utils: { setLoadingMsg }});

  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  useEffect(() => {
    checkIfWalletIsConnected();

    connectedContract && setEthersAPI({
      ethereum,
      connectedContract,
      setupReady: true,
    })
  }, []);

  return (
    <div className="App">
      {loadingMsg && <Loader />}

      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My {CONTRACT.TOKEN_NAME}-NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your {CONTRACT.TOKEN_SYMBOL} NFT today.
          </p>
          {currentAccount === ""
            ? (
              renderNotConnectedContainer()
            )
            : (
              <button onClick={mintNFT} className="cta-button connect-wallet-button">
                Mint NFT
              </button>
            )
          }
        </div>

        <div className="body-container">
          <div className="tokens-container" >
            {collection.length && collection?.map(item => (<TokenCard token={item} key={uuid()} />))}
          </div>
        </div>

        {/*<button onClick={retrieveMyOwnedTokens} className="cta-button connect-wallet-button">*/}
        {/*  Log My owned Tokens*/}
        {/*</button>*/}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={SOCIAL.TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${SOCIAL.TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;

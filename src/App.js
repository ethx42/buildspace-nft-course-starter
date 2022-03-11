import React, { useEffect,  } from 'react';
import { useAtom } from 'jotai';
import { v4 as uuid } from 'uuid';

import twitterLogo from './assets/twitter-logo.svg';
import {Loader, Modal, TokenCard} from './components';
import { SOCIAL, CONTRACT } from './constants';
import { ownedTokensAtom, totalMintedAtom, currentAccountAtom, loadingAtom, ethersAPIAtom } from './state';
import { connectContract, askContractTo } from './utils';
import { useContractServices, useMetamaskServices } from "./services";

import './styles/App.css';

const App = () => {
  const { ethereum, connectedContract } = connectContract(CONTRACT.ADDRESS);
  const [, setEthersAPI] = useAtom(ethersAPIAtom);
  const [loadingMsg, setLoadingMsg] = useAtom(loadingAtom);
  const [currentAccount] = useAtom(currentAccountAtom);
  const [ownedTokens] = useAtom(ownedTokensAtom);
  const [totalMinted] = useAtom(totalMintedAtom);

  const { checkIfWalletIsConnected, connectWallet } = useMetamaskServices();
  const { mintERC721 } = useContractServices();

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
      {loadingMsg &&
        <Modal isFullscreen>
          <Loader />
        </Modal>
      }

      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My {CONTRACT.TOKEN_NAME}-NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your {CONTRACT.TOKEN_SYMBOL} NFT today.
          </p>
          <p className="sub-text">
            {ownedTokens.length !== 0 && `${CONTRACT.TOTAL_AVAILABLE_TOKENS - totalMinted} Tokens Available`}
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
            { ownedTokens.length > 0 && ownedTokens?.map(item => (<TokenCard token={item} key={uuid()} />)) }
          </div>
        </div>

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

import { ethers } from 'ethers';

import EEAlienNFT from '../contracts/EEALienNFT.json'

export const connectContract = (CONTRACT_ADDRESS) => {
  let connectedContract;

  const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      connectedContract = new ethers.Contract(CONTRACT_ADDRESS, EEAlienNFT.abi, signer);
    }

  return { ethereum, connectedContract };
}

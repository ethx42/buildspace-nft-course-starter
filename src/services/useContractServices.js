import { useAtom } from 'jotai';

import { CONTRACT, MESSAGE } from '../constants';
import { ownedTokensAtom, totalMintedAtom, ethersAPIAtom, loadingAtom } from '../state';

const {
	NewEEALienNFTMinted,
	TotalMintedTokens,
	OwnedItemsByAddress,
	GetMetadata,
	NoMoreTokens,
	Transfer
} = CONTRACT.EVENTS;

export const useContractServices = () => {
	const [ethersAPI] = useAtom(ethersAPIAtom);
	const [, setLoadingMsg] = useAtom(loadingAtom);
	const [ownedTokens, setOwnedTokens] = useAtom(ownedTokensAtom);
	const [, setTotalMinted] = useAtom(totalMintedAtom);

	const { ethereum, connectedContract } = ethersAPI;

	async function mintERC721() {
		const nftTxn = await connectedContract.mintAnNFT();
		setLoadingMsg(MESSAGE.MINTING_NFT);

		await nftTxn.wait();
		setLoadingMsg(MESSAGE.INITIAL);

		console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
	}


	async function setupEventListener() {
		try {
			if (ethereum) {

				connectedContract.on(NewEEALienNFTMinted, (from, tokenId, finalSvg) => {
					setOwnedTokens(items => ([
						...items,
						{ component: finalSvg, id: tokenId.toNumber() }
					]));
					console.log({ component: finalSvg, id: tokenId.toNumber() })
					console.log('ownedTokens collection', ownedTokens)
				});

				connectedContract.on(TotalMintedTokens, (totalMintedTokens) => {
					setTotalMinted(parseInt(totalMintedTokens, 16));
					console.log('totalMintedTokens' ,totalMintedTokens);
				});

				connectedContract.on(OwnedItemsByAddress, (items) => {
					console.log('ownedItems -> ', items);
				});

				connectedContract.on(GetMetadata, (metadata) => {
					console.log('metadata' ,metadata);
				});

				connectedContract.on(NoMoreTokens, (data) => {
					console.log('NoMoreTokensEvent', data);
				});

				connectedContract.on(Transfer, (from, to, tokenId) => {
					console.log(`NFT with ID ${tokenId} transferred from ${from}, to ${to} succesfully`);
				});

			} else {
				console.error(MESSAGE.MISSING_ETHEREUM);
			}
		} catch (error) {
			console.error(error);
		}
	}

	return { setupEventListener, mintERC721 }
}

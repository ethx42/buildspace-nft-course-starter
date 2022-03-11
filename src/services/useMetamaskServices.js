import {useAtom} from "jotai";

import {CONTRACT, MESSAGE} from "../constants";
import {currentAccountAtom, ethersAPIAtom} from "../state";

import {useContractServices} from "./useContractServices";

export const useMetamaskServices = () => {
	const [ethersAPI] = useAtom(ethersAPIAtom);
	const [, setCurrentAccount] = useAtom(currentAccountAtom);

	const { ethereum } = ethersAPI;

	const { setupEventListener } = useContractServices();

	async function checkIfWalletIsConnected() {
		if (!ethereum) {
			console.log(MESSAGE.MISSING_METAMASK);
			return;
		}

		const chainId = await ethereum.request({ method: 'eth_chainId' });
		console.log('Connected to chain ' + chainId);

		if (chainId !== CONTRACT.RINKEBY_CHAIN_ID) {
			alert(MESSAGE.NETWORK_IS_NOT_RINKEBY);
		}

		const accounts = await ethereum.request({ method: 'eth_accounts' });

		if (accounts.length !== 0) {
			const account = accounts[0];

			setCurrentAccount(account);

			await setupEventListener();
		} else {
			console.error(MESSAGE.UNAUTHORIZED_ACCOUNT)
		}
	}

	async function connectWallet() {
		try {
			if (!ethereum) {
				alert(MESSAGE.GET_METAMASK);
				return;
			}

			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
			setCurrentAccount(accounts[0]);

			await setupEventListener();

		} catch (error) {
			console.error(error);
		}
	}

	return { checkIfWalletIsConnected, connectWallet }
}

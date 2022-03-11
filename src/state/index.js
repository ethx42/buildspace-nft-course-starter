import { atom } from 'jotai'

export const loadingAtom = atom(false);
export const currentAccountAtom = atom('');

export const ethersAPIAtom = atom({
	ethereum: undefined,
	connectedContract: undefined,
	setupReady: false,
});

export const ownedTokensAtom = atom([]);

export const totalMintedAtom = atom(0);
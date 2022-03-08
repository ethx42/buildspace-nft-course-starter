import { atom } from 'jotai'

export const currentAccountAtom = atom('');
export const loadingAtom = atom(false);
export const ethersAPIAtom = atom({
	ethereum: undefined,
	connectedContract: undefined,
	setupReady: false,
})

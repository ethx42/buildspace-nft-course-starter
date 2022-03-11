import { atom } from 'jotai'

export const loadingAtom = atom(false);
export const currentAccountAtom = atom('');

export const ethersAPIAtom = atom({
	ethereum: undefined,
	connectedContract: undefined,
	setupReady: false,
});

export const ownedTokensAtom = atom([{
	"component": "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 350 350'><style>.base { fill: white; font-family: serif; font-size: 24px; }</style><rect width='100%' height='100%' fill='black' /><text x='50%' y='50%' class='base' dominant-baseline='middle' text-anchor='middle'>BespatterTediousReplenishment</text></svg>",
	"id": 22
}]);

export const totalMintedAtom = atom(0);
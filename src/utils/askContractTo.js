import { CONTRACT, MESSAGE } from '../constants';
import { connectContract } from '../utils';

export const askContractTo = (callback) => async ({ utils, params = {} }) => {
	const { ethereum } = connectContract(CONTRACT.ADDRESS);

	try {
		if (ethereum) {
			utils?.setLoadingMsg(MESSAGE.CONTINUE_IN_METAMASK);

			await callback({ params });

			utils?.setLoadingMsg(undefined);
		} else {
			console.error(MESSAGE.MISSING_ETHEREUM);
		}
	} catch (error) {
		utils?.setLoadingMsg(undefined);
		console.error(error);
	}
}
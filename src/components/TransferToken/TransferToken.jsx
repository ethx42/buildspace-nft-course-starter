import React, {useEffect, useState} from 'react';
import {useAtom} from "jotai";
import { ethers } from 'ethers';

import { ReactComponent as ArrowRight } from '../../assets/arrow-right.svg';
import { Icon } from "../TokenCard/TokenCard.styles";
import { askContractTo } from '../../utils';
import {currentAccountAtom, ethersAPIAtom, loadingAtom} from "../../state";

import {
	Container,
	AddressTextInput,
	AddressInputWrapper,
	TokenWrapper,
	TransferButton,
	DescriptionWrapper, LegendsWrapper
} from './TransferToken.styles';

const TransferToken = ({ svgComponent, metadata }) => {
	const [destinationAddress, setDestinationAddress] = useState();
	const [, setIsValid] = useState(false);
	const [currentAccount] = useAtom(currentAccountAtom);
	const [ethersAPI] = useAtom(ethersAPIAtom);

	const [, setLoadingMsg] = useAtom(loadingAtom);

	const { connectedContract } = ethersAPI;

	const transferNFT = async () => {
		const transferTxn = await connectedContract["safeTransferFrom(address,address,uint256)"](currentAccount, destinationAddress, metadata.id);
		await transferTxn.wait();
		console.log(`Transferred, see transaction: https://rinkeby.etherscan.io/tx/${transferTxn.hash}`);
	}

	const transferNFTHandler = () => askContractTo(transferNFT)({ utils: { setLoadingMsg }});

	useEffect(() => {
		setIsValid(ethers.utils.isAddress(destinationAddress));
		console.log('destination', destinationAddress);
		console.log('currentAcc', currentAccount);

	}, [destinationAddress])

	return (
		<Container>
			<TokenWrapper>
				{svgComponent}
			</TokenWrapper>

			<DescriptionWrapper>
				<LegendsWrapper>
					TXT
				</LegendsWrapper>

				<AddressInputWrapper>
					<AddressTextInput
						type="text"
						name="destinationAddress"
						required
						onChange={({ target }) => {
							console.log(target)
							setDestinationAddress(target.value)
						}}
						placeholder="What's the destination address?"
					/>


						<TransferButton type="submit" onClick={transferNFTHandler}><Icon><ArrowRight /></Icon></TransferButton>

				</AddressInputWrapper>
			</DescriptionWrapper>
		</Container>
	)
}

export default TransferToken;
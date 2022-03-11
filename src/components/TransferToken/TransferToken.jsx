import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAtom } from 'jotai';
import { ethers } from 'ethers';

import { ReactComponent as ArrowRight } from '../../assets/arrow-right.svg';
import { useContractServices } from '../../services';
import { askContractTo } from '../../utils';
import { loadingAtom } from '../../state';
import { MESSAGE } from '../../constants';

import { Icon } from '../TokenCard/TokenCard.styles';
import {
	Container,
	AddressTextInput,
	AddressInputWrapper,
	TokenWrapper,
	TransferButton,
	DescriptionWrapper, DestinationAddressError,
} from './TransferToken.styles';

const TransferToken = ({ svgComponent, metadata }) => {
	const [destinationAddress, setDestinationAddress] = useState();
	const [isValidAddress, setIsValidAddress] = useState(false);
	const [addressChecked, setAddressChecked] = useState(false);
	const [, setLoadingMsg] = useAtom(loadingAtom);

	const { transferNFT } = useContractServices();

	const transferNFTHandler = () => {
		setIsValidAddress(ethers.utils.isAddress(destinationAddress));
		setAddressChecked(true);

		if (isValidAddress) {
			askContractTo(transferNFT)({
				utils: { setLoadingMsg },
				params: {
					destinationAddress,
					tokenId: metadata.id
				}
			});
		}
	}

	return (
		<Container>
			<TokenWrapper>
				{svgComponent}
			</TokenWrapper>

			<DescriptionWrapper>
				<AddressInputWrapper>
					<AddressTextInput
						type="text"
						name="destinationAddress"
						required
						onChange={({ target }) => setDestinationAddress(target.value)}
						placeholder="What's the destination address?"
					/>

					<TransferButton
						type="submit"
						onClick={transferNFTHandler}
					>
						<Icon><ArrowRight/></Icon>
					</TransferButton>
				</AddressInputWrapper>
			</DescriptionWrapper>

			{addressChecked && !isValidAddress && <DestinationAddressError>{MESSAGE.INVALID_ADDRESS}</DestinationAddressError>}
		</Container>
	)
}

TransferToken.propTypes = {
	svgComponent: PropTypes.node.isRequired,
	metadata: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	}),
}

export default TransferToken;
import React from 'react'
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { useAtom } from 'jotai';

import {ReactComponent as RaribleLogo} from '../../assets/rarible-logo.svg';
import {ReactComponent as OpenSeaLogo} from '../../assets/opensea-logo.svg';
import { askContractTo } from '../../utils/askContractTo';
import {Container, ControlContainer, SvgCardContainer, TokenLinks, TransferButton, Icon} from './TokenCard.styles';

import { CONTRACT, SOCIAL } from '../../utils/constants';
import { currentAccountAtom, ethersAPIAtom, loadingAtom } from "../../state";

const destinationAddress = '0xeee3322a7a7d155EBA6efD0d7Db931AAeDE54Fa8';

const TokenCard = ({ token }) => {
  const [ethersAPI] = useAtom(ethersAPIAtom);
  const [currentAccount] = useAtom(currentAccountAtom);
  const [_, setLoading] = useAtom(loadingAtom);

  const { connectedContract } = ethersAPI;

  const goToLink = (provider) => {
    const url = provider === SOCIAL.OPENSEA_LINK
      ? `${provider}/${CONTRACT.ADDRESS}/${token.id}`
      : `${provider}/${CONTRACT.ADDRESS}:${token.id}`
    
      return window.open(
      url,
      '_blank',
      'noopener,noreferrer'
    ); 
  }

  const transferNFT = async () => {
    const transferTxn = await connectedContract["safeTransferFrom(address,address,uint256)"](currentAccount, destinationAddress, token.id);
    await transferTxn.wait();
    console.log(`Transferred, see transaction: https://rinkeby.etherscan.io/tx/${transferTxn.hash}`);
  }

  const transferNFTHandler = () => askContractTo(transferNFT)({ utils: { setLoading }});

  return (
    <Container>
      <SvgCardContainer>
        {parse(token.component)}
      </SvgCardContainer>

      <ControlContainer>
        <TransferButton onClick={transferNFTHandler}>Transfer</TransferButton>

        <TokenLinks>
          <Icon><OpenSeaLogo className="tokenCard-logo" onClick={() => goToLink(SOCIAL.OPENSEA_LINK)} /></Icon>
          <Icon><RaribleLogo className="tokenCard-logo" onClick={() => goToLink(SOCIAL.RARIBLE_LINK)} /></Icon>
        </TokenLinks>
      </ControlContainer>
    </Container>
  )
}

TokenCard.propTypes = {
  token: PropTypes.shape({
    component: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
}

export default TokenCard

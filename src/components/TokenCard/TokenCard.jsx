import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import parse from 'html-react-parser';

import Modal from '../Modal';
import TransferToken from '../TransferToken';
import { ReactComponent as RaribleLogo } from '../../assets/rarible-logo.svg';
import { ReactComponent as OpenSeaLogo } from '../../assets/opensea-logo.svg';
import { ReactComponent as TransferIcon } from '../../assets/zap.svg';
import { CONTRACT, SOCIAL } from '../../constants';

import { Container, ControlContainer, SvgCardContainer, TokenLinks, TransferButtonWrapper, Icon } from './TokenCard.styles';

const TokenCard = ({ token }) => {
  const [activeTransfer, setActiveTransfer] = useState(false);

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

  const renderTokenSvg = () =>
    (<SvgCardContainer>
      {parse(token.component)}
    </SvgCardContainer>);

  const renderTransferModal = ({ svgComponent, metadata }) => (
    <Modal isFullscreen closable >
      <TransferToken svgComponent={svgComponent} metadata={metadata} />
    </Modal>
  );

  return (
    <Container>
      {renderTokenSvg()}

      <ControlContainer>
        <ReactTooltip
          id="transferButton"
          place="top"
          delayShow={200}
          delayHide={500}
          textColor="#000"
          effect="solid"
          backgroundColor="#FADF00"
          border
          arrowColor="#FADF00"
        >
          <span>Transfer your NFT</span>
        </ReactTooltip>

        <Icon>
          <TransferButtonWrapper onClick={() => {}}>
            <TransferIcon data-tip data-for="transferButton" onClick={() => setActiveTransfer(true)} />
          </TransferButtonWrapper>
        </Icon>

        <TokenLinks>
          <Icon><OpenSeaLogo onClick={() => goToLink(SOCIAL.OPENSEA_LINK)} /></Icon>
          <Icon><RaribleLogo onClick={() => goToLink(SOCIAL.RARIBLE_LINK)} /></Icon>
        </TokenLinks>
      </ControlContainer>

      {activeTransfer && renderTransferModal({
        svgComponent: renderTokenSvg(),
        metadata: { id: token.id }}
      )}
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

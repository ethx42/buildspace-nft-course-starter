import React from 'react';
import PropTypes from 'prop-types';
import { useAtom } from 'jotai';

import { ReactComponent as CloseIcon } from '../../assets/x.svg';
import { Container, CloseModal } from './Modal.styles';
import { loadingAtom } from "../../state";

const Modal = ({ isFullscreen, children, closable }) => {
	const [, setLoadingMsg] = useAtom(loadingAtom);

	const closeModal = () => setLoadingMsg(undefined);

	return (
		<Container isFullscreen={isFullscreen}>
			{closable && <CloseModal onClick={closeModal}><CloseIcon/></CloseModal>}
			{children}
		</Container>
	)
}

Modal.defaultProps = {
	isFullscreen: false,
	closable: false,
}

Modal.propTypes = {
	children: PropTypes.node.isRequired,
	isFullscreen: PropTypes.bool,
	closable: PropTypes.bool,
}

export default Modal;
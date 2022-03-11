import React from 'react';

import {Container} from './Modal.styles';

const Modal = ({ isFullscreen, children }) => {

	return (
		<Container isFullscreen={isFullscreen} >
			{children}
		</Container>
	)
}

export default Modal;
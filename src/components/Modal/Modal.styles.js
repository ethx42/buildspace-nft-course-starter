import styled, { css } from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-flow: column nowrap;
	align-content: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	position: absolute;
  background-color: rgba(16, 10, 27, 0.4);
	backdrop-filter: blur(7px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
	
	${({ isFullscreen }) => !isFullscreen && css`
		border-radius: 0.5rem;
		padding: 1.5rem;
		border: 0.2rem solid #60c657;
		margin: 0;
    width: 85%;
    height: 75%;
	`}
`;

export const CloseModal = styled.i`
  display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	width: 5rem;
	height: 5rem;
	background-color: #35aee2;
	position: absolute;
	top: 1rem;
	right: 1rem;
	cursor: pointer;
`

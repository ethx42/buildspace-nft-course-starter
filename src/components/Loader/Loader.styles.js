import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-flow: column nowrap;
	align-content: center;
	justify-content: center;
`;

export const SpinnerImage = styled.img`
  width: 15%;
	margin: 0 auto;
	objectFit: contain
`;

export const Description = styled.p`
  background: -webkit-linear-gradient(left, #60c657 30%, #35aee2 60%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
	font-size: 1.5rem;
`;
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 20%;
`;

export const SvgCardContainer = styled.div`
  border: 0.5px solid #60c657;
  border-image-source: linear-gradient(to left, #60c657, #35aee2);;
  border-image-slice: 1;
`;

export const ControlContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  background: #C101EE;
	border: 1px solid #35aee2;
	border-top-style: none;
  border-bottom-left-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;
  padding: 0 0.5rem;
`;

export const TransferButtonWrapper = styled.div`
  cursor: pointer;
	border-radius: 0.5rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;

export const TokenLinks = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  gap: 0.1rem;
`;

export const Icon = styled.span`
  display: flex;
  flex-flow: row nowrap;
  align-content: center;
  justify-content: center;
  align-items: center;

  & > svg {
    width: 3.5rem;
    height: 3.5rem;
    cursor: pointer;
  }
`;

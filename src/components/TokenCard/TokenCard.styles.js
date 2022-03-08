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
`;

export const TransferButton = styled.button`
  cursor: pointer;
`;

export const TokenLinks = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  gap: 0.1rem;
`;

export const Icon = styled.span`
  & > svg {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }
`;

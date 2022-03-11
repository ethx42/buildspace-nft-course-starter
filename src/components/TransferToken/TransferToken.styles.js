import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-flow: row wrap;
	align-content: center;
	justify-content: space-around;
  border-radius: 0.5rem;
  padding: 1.5rem;
  border: 0.2rem solid #60c657;
  margin: 0;
  width: 85%;
  height: 75%;
  position: absolute;
  background-color: rgba(16, 10, 27, 0.4);
  backdrop-filter: blur(7px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const TokenWrapper = styled.div`
	min-width: 35%;
	padding-bottom: 5rem;
`;

export const AddressInputWrapper = styled.div`
  @keyframes gradient {
    0%{background-position:0 0}
    100%{background-position:100% 0}
  }
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 55rem;
  margin: 0 auto;
  border-radius: 2px;
  padding: 1.4rem 2rem 1.6rem;
  background: rgba(57, 63, 84, 0.8);
  &:after {
    content: "";
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 999;
    height: 2px;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    background-position: 0% 0%;
    background: linear-gradient(to right, #B294FF, #57E6E6, #FEFFB8, #57E6E6, #B294FF, #57E6E6);
    background-size: 500% auto;
    animation: gradient 3s linear infinite;
  }
`;

export const AddressTextInput = styled.input`
  flex-grow: 1;
  color: #BFD2FF;
  font-size: 1.8rem;
  line-height: 2.4rem;
  vertical-align: middle;
  background: transparent;
	border: none;
  &::-webkit-input-placeholder {
    color: #7881A1;
  }
`
export const TransferButton = styled.button`
  color: #7881A1;
  font-size: 2.4rem;
  line-height: 2.4rem;
  vertical-align: middle;
  transition: color .25s;
  &:hover {
    color: #BFD2FF;
  }
`

export const DescriptionWrapper = styled.div`
	width: 100%;
`;

export const DestinationAddressError = styled.p`
	color: red;
	font-size: 1.2rem;
	margin-top: 0.5rem;
	width: 55rem;
	text-align: right;
`
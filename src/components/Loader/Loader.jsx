import React from 'react';
import { useAtom } from 'jotai';

import eth_space_gen from '../../assets/eth_space_gen.gif';
import { loadingAtom } from '../../state';

import { Container, Description, SpinnerImage } from './Loader.styles';

const Loader = () => {
  const [loadingText] = useAtom(loadingAtom);

  return (
    <Container>
      <SpinnerImage src={eth_space_gen} alt='Loader indicator' />

      <Description>
        {loadingText}
      </Description>
    </Container>
  )
}

export default Loader;
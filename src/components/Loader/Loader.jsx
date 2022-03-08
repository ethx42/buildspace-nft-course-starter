import React from 'react';
import PropTypes from 'prop-types';
import { useAtom } from 'jotai';

import eth_space_gen from '../../assets/eth_space_gen.gif';
import {Container, Description, SpinnerImage} from "./Loader.styles";
import { loadingAtom } from '../../state';

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
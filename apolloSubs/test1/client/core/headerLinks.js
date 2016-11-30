import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

//STATELESS FUNCTION IS RECOMMENDED
const HeaderLinks = () => {
  return (
    <nav>
      <IndexLink to="/" activateClassName="active">Home</IndexLink>
    </nav>
  );
};

export default HeaderLinks;

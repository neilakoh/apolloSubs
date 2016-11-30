import React, {PropTypes} from 'react';
import HeaderLinks from './headerLinks';

class Core extends React.Component {
  render() {
    return (
      <div className="core">
        <h1>CORE PAGE</h1>
        <div><HeaderLinks /></div>
        {this.props.children}
      </div>
    );
  }
}

Core.propTypes = {
  children: PropTypes.object.isRequired
};

export default Core;

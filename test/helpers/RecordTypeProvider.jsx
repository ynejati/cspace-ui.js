import { Component, Children } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node.isRequired,
  recordType: PropTypes.string,
};

const childContextTypes = {
  recordType: PropTypes.string,
};

export default class RecordTypeProvider extends Component {
  getChildContext() {
    return {
      recordType: this.props.recordType,
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}

RecordTypeProvider.propTypes = propTypes;
RecordTypeProvider.childContextTypes = childContextTypes;

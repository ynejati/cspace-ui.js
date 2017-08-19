import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';
import CloneButton from './CloneButton';
import SaveButton from './SaveButton';
import RevertButton from './RevertButton';
import DeleteButton from './DeleteButton';
import styles from '../../../styles/cspace-ui/ButtonBar.css';

const propTypes = {
  csid: PropTypes.string,
  isModified: PropTypes.bool,
  isSavePending: PropTypes.bool,
  validationErrors: PropTypes.instanceOf(Immutable.Map),
  onCloneButtonClick: PropTypes.func,
  onDeleteButtonClick: PropTypes.func,
  onRevertButtonClick: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
  onSaveButtonErrorBadgeClick: PropTypes.func,
};

export default class RecordButtonBar extends Component {
  constructor(props) {
    super(props);

    this.setDomNode = this.setDomNode.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      docked: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  setDomNode(ref) {
    this.domNode = ref;
  }

  handleScroll() {
    const node = this.domNode;

    if (!node) return;

    if (this.state.docked) {
      if (window.scrollY < 136) {
        this.setState({
          docked: false,
        });
      }
    } else if (window.scrollY >= 136) {
      this.setState({
        docked: true,
      });
    }
  }

  render() {

    const {
      docked,
    } = this.state;

    const {
      isModified,
      isSavePending,
      validationErrors,
      onSaveButtonClick,
      onSaveButtonErrorBadgeClick,
      csid,
      onCloneButtonClick,
      onRevertButtonClick,
      onDeleteButtonClick,
    } = this.props;

    const className = classNames(docked ? styles.docked : styles.common);
    const inlineStyle = docked ? { height: this.domNode.offsetHeight } : {};

    return (
      <div 
        className={className} 
        style={inlineStyle}
        ref={this.setDomNode}
      >
        <SaveButton
          isModified={isModified}
          isSavePending={isSavePending}
          validationErrors={validationErrors}
          onClick={onSaveButtonClick}
          onErrorBadgeClick={onSaveButtonErrorBadgeClick}
        />
        <CloneButton
          csid={csid}
          isModified={isModified}
          isSavePending={isSavePending}
          onClick={onCloneButtonClick}
        />
        <RevertButton
          isModified={isModified}
          isSavePending={isSavePending}
          onClick={onRevertButtonClick}
        />
        <DeleteButton
          csid={csid}
          isSavePending={isSavePending}
          onClick={onDeleteButtonClick}
        />
      </div>
    );
  }
}

RecordButtonBar.propTypes = propTypes;

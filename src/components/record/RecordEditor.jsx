/* global window */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Prompt } from 'react-router';
import Immutable from 'immutable';
import warning from 'warning';
import classNames from 'classnames';
import RecordButtonBar from './RecordButtonBar';
import RecordFormSelector from './RecordFormSelector';
import RecordHistory from './RecordHistory';
import ConfirmRecordNavigationModal from './ConfirmRecordNavigationModal';
import ConfirmRecordDeleteModal from './ConfirmRecordDeleteModal';
import { DOCUMENT_PROPERTY_NAME } from '../../helpers/recordDataHelpers';
import styles from '../../../styles/cspace-ui/RecordEditor.css';

function renderTemplate(component, messages, handlers) {
  const overrideProps = {};
  const type = component.type;

  if (type) {
    const propTypes = type.propTypes;

    if (propTypes) {
      Object.keys(handlers).forEach((handlerName) => {
        if (propTypes[handlerName] && !component.props[handlerName]) {
          overrideProps[handlerName] = handlers[handlerName];
        }
      });
    }
  }

  return React.cloneElement(
    component,
    overrideProps,
    React.Children.map(
      component.props.children,
      child => renderTemplate(child, messages, handlers)));
}

const propTypes = {
  config: PropTypes.object,
  recordType: PropTypes.string.isRequired,
  vocabulary: PropTypes.string,
  csid: PropTypes.string,
  cloneCsid: PropTypes.string,
  data: PropTypes.instanceOf(Immutable.Map),
  formName: PropTypes.string,
  validationErrors: PropTypes.instanceOf(Immutable.Map),
  isModified: PropTypes.bool,
  isSavePending: PropTypes.bool,
  openModalName: PropTypes.string,
  createNewRecord: PropTypes.func,
  readRecord: PropTypes.func,
  onAddInstance: PropTypes.func,
  onCommit: PropTypes.func,
  onMoveInstance: PropTypes.func,
  onRemoveInstance: PropTypes.func,
  onRecordCreated: PropTypes.func,
  onSaveCancelled: PropTypes.func,
  closeModal: PropTypes.func,
  openModal: PropTypes.func,
  save: PropTypes.func,
  revert: PropTypes.func,
  clone: PropTypes.func,
  transitionRecord: PropTypes.func,
  removeValidationNotification: PropTypes.func,
  setForm: PropTypes.func,
  validateRecordData: PropTypes.func,
  onRecordTransitioned: PropTypes.func,
};

const defaultProps = {
  data: Immutable.Map(),
  formName: 'default',
};

const childContextTypes = {
  config: PropTypes.object,
  recordType: PropTypes.string,
  vocabulary: PropTypes.string,
  csid: PropTypes.string,
};

export default class RecordEditor extends Component {
  constructor() {
    super();

    this.handleConfirmDeleteButtonClick = this.handleConfirmDeleteButtonClick.bind(this);

    this.handleConfirmNavigationSaveButtonClick =
      this.handleConfirmNavigationSaveButtonClick.bind(this);

    this.handleConfirmNavigationRevertButtonClick =
      this.handleConfirmNavigationRevertButtonClick.bind(this);

    this.handleModalCancelButtonClick = this.handleModalCancelButtonClick.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    this.handleSaveButtonErrorBadgeClick = this.handleSaveButtonErrorBadgeClick.bind(this);
    this.handleRevertButtonClick = this.handleRevertButtonClick.bind(this);
    this.handleCloneButtonClick = this.handleCloneButtonClick.bind(this);
    this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
    this.handleRecordFormSelectorCommit = this.handleRecordFormSelectorCommit.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleHeaderRef = this.handleHeaderRef.bind(this);

    this.state = {
      docked: false,
    };
  }

  getChildContext() {
    const {
      config,
      csid,
      recordType,
      vocabulary,
    } = this.props;

    return {
      config,
      csid,
      recordType,
      vocabulary,
    };
  }

  componentDidMount() {
    this.initRecord();
    window.addEventListener('scroll', this.handleScroll, false);
  }

  componentDidUpdate(prevProps) {
    const {
      recordType,
      vocabulary,
      csid,
      cloneCsid,
    } = this.props;

    const {
      recordType: prevRecordType,
      vocabulary: prevVocabulary,
      csid: prevCsid,
      cloneCsid: prevCloneCsid,
    } = prevProps;

    if (
      recordType !== prevRecordType ||
      vocabulary !== prevVocabulary ||
      csid !== prevCsid ||
      cloneCsid !== prevCloneCsid
    ) {
      this.initRecord();
    }
  }

  componentWillUnmount() {
    const {
      removeValidationNotification,
    } = this.props;

    if (removeValidationNotification) {
      removeValidationNotification();
    }

    window.removeEventListener('scroll', this.handleScroll, false);
  }

  initRecord() {
    const {
      csid,
      cloneCsid,
      createNewRecord,
      readRecord,
      removeValidationNotification,
    } = this.props;

    if (removeValidationNotification) {
      removeValidationNotification();
    }

    if (csid) {
      if (readRecord) {
        readRecord();
      }
    } else if (createNewRecord) {
      createNewRecord(cloneCsid);
    }
  }

  handleModalCancelButtonClick() {
    const {
      closeModal,
      onSaveCancelled,
    } = this.props;

    if (closeModal) {
      closeModal(false);
    }

    if (onSaveCancelled) {
      onSaveCancelled();
    }
  }

  handleConfirmDeleteButtonClick() {
    const {
      closeModal,
      transitionRecord,
      onRecordTransitioned,
    } = this.props;

    const transitionName = 'delete';

    if (transitionRecord) {
      transitionRecord(transitionName)
        .then(() => {
          if (closeModal) {
            closeModal(true);
          }

          if (onRecordTransitioned) {
            onRecordTransitioned(transitionName);
          }
        });
    }
  }

  handleConfirmNavigationSaveButtonClick() {
    const {
      closeModal,
      save,
      onRecordCreated,
    } = this.props;

    if (save) {
      // Wrap the onRecordCreated callback in a function that sets isNavigating to true. This lets
      // the callback know that we're already navigating away, so it should not do any navigation
      // of its own.

      const callback = onRecordCreated
        ? (newRecordCsid) => { onRecordCreated(newRecordCsid, true); }
        : undefined;

      save(callback);
    }

    if (closeModal) {
      closeModal(true);
    }
  }

  handleConfirmNavigationRevertButtonClick() {
    const {
      closeModal,
      revert,
    } = this.props;

    if (revert) {
      revert();
    }

    if (closeModal) {
      closeModal(true);
    }
  }

  handleCloneButtonClick() {
    const {
      clone,
      csid,
    } = this.props;

    if (clone) {
      clone(csid);
    }
  }

  handleDeleteButtonClick() {
    const {
      openModal,
    } = this.props;

    if (openModal) {
      openModal(ConfirmRecordDeleteModal.modalName);
    }
  }

  handleRevertButtonClick() {
    const {
      revert,
    } = this.props;

    if (revert) {
      revert();
    }
  }

  handleScroll() {
    const header = this.header;

    if (!header) return;

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

  handleSaveButtonClick() {
    const {
      save,
      onRecordCreated,
    } = this.props;

    if (save) {
      save(onRecordCreated);
    }
  }

  handleSaveButtonErrorBadgeClick() {
    const {
      validateRecordData,
    } = this.props;

    if (validateRecordData) {
      validateRecordData();
    }
  }

  handleRecordFormSelectorCommit(path, value) {
    const {
      setForm,
    } = this.props;

    if (setForm) {
      setForm(value);
    }
  }

  handleHeaderRef(ref) {
    this.header = ref;
  }

  renderConfirmNavigationModal() {
    const {
      isModified,
      isSavePending,
      openModalName,
      validationErrors,
    } = this.props;

    return (
      <ConfirmRecordNavigationModal
        isOpen={openModalName === ConfirmRecordNavigationModal.modalName}
        isModified={isModified}
        isSavePending={isSavePending}
        validationErrors={validationErrors}
        onCancelButtonClick={this.handleModalCancelButtonClick}
        onCloseButtonClick={this.handleModalCancelButtonClick}
        onSaveButtonClick={this.handleConfirmNavigationSaveButtonClick}
        onSaveButtonErrorBadgeClick={this.handleSaveButtonErrorBadgeClick}
        onRevertButtonClick={this.handleConfirmNavigationRevertButtonClick}
      />
    );
  }

  renderConfirmRecordDeleteModal() {
    const {
      csid,
      isSavePending,
      openModalName,
    } = this.props;

    return (
      <ConfirmRecordDeleteModal
        csid={csid}
        isOpen={openModalName === ConfirmRecordDeleteModal.modalName}
        isSavePending={isSavePending}
        onCancelButtonClick={this.handleModalCancelButtonClick}
        onCloseButtonClick={this.handleModalCancelButtonClick}
        onDeleteButtonClick={this.handleConfirmDeleteButtonClick}
      />
    );
  }

  render() {
    const {
      config,
      csid,
      data,
      formName,
      isModified,
      isSavePending,
      recordType,
      validationErrors,
      onAddInstance,
      onCommit,
      onMoveInstance,
      onRemoveInstance,
    } = this.props;

    const {
      docked,
    } = this.state;

    const recordTypeConfig = config.recordTypes[recordType];

    if (!recordTypeConfig) {
      return null;
    }

    const {
      forms,
      messages,
    } = recordTypeConfig;

    const handlers = {
      onAddInstance,
      onCommit,
      onMoveInstance,
      onRemoveInstance,
    };

    const formTemplate = forms[formName].template;

    warning(formTemplate, `No form template found for form name ${formName} in record type ${recordType}. Check the record type plugin configuration.`);

    const formContent = React.cloneElement(formTemplate, {
      name: DOCUMENT_PROPERTY_NAME,
      value: data.get(DOCUMENT_PROPERTY_NAME),
      children: React.Children.map(
        formTemplate.props.children,
        child => renderTemplate(child, messages, handlers)),
    });

    const className = classNames(docked ? styles.docked : styles.common);
    const inlineStyle = docked ? { height: this.header.offsetHeight } : {};

    return (
      <form
        autoComplete="off"
        className={styles.common}
      >

        <header>
          <div
            className={className}
            ref={this.handleHeaderRef}
            style={inlineStyle}
          >
            <RecordButtonBar
              csid={csid}
              isModified={isModified}
              isSavePending={isSavePending}
              validationErrors={validationErrors}
              onSaveButtonClick={this.handleSaveButtonClick}
              onSaveButtonErrorBadgeClick={this.handleSaveButtonErrorBadgeClick}
              onRevertButtonClick={this.handleRevertButtonClick}
              onCloneButtonClick={this.handleCloneButtonClick}
              onDeleteButtonClick={this.handleDeleteButtonClick}
            />
            <RecordFormSelector
              config={config}
              formName={formName}
              recordType={recordType}
              onCommit={this.handleRecordFormSelectorCommit}
            />
            <RecordHistory
              data={data}
              isModified={isModified}
              isSavePending={isSavePending}
            />
          </div>
        </header>
        {formContent}
        <footer>
          <RecordButtonBar
            csid={csid}
            isModified={isModified}
            isSavePending={isSavePending}
            validationErrors={validationErrors}
            onSaveButtonClick={this.handleSaveButtonClick}
            onSaveButtonErrorBadgeClick={this.handleSaveButtonErrorBadgeClick}
            onRevertButtonClick={this.handleRevertButtonClick}
            onCloneButtonClick={this.handleCloneButtonClick}
            onDeleteButtonClick={this.handleDeleteButtonClick}
          />
        </footer>
        <Prompt
          when={isModified && !isSavePending}
          message={ConfirmRecordNavigationModal.modalName}
        />
        {this.renderConfirmNavigationModal()}
        {this.renderConfirmRecordDeleteModal()}
      </form>
    );
  }
}

RecordEditor.propTypes = propTypes;
RecordEditor.defaultProps = defaultProps;
RecordEditor.childContextTypes = childContextTypes;


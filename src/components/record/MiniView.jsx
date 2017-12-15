import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecordForm from './RecordForm';
import styles from '../../../styles/cspace-ui/MiniView.css';

const propTypes = {
  ...RecordForm.propTypes,
  readRecord: PropTypes.func,
};

export default class MiniView extends Component {

  componentDidMount() {
    const {
      csid,
      readRecord,
    } = this.props;

    if (csid) {
      if (readRecord) {
        readRecord();
      }
    }
  }

  render() {
    const {
      recordType,
      config,
      csid,
      data,
      ...remainingProps
    } = this.props;

    return (
      <div
        className={styles.common}
      >
        <RecordForm
          readOnly
          formName="mini"
          csid={csid}
          recordType={recordType}
          config={config}
          data={data}
          {...remainingProps}
        />
      </div>
    );
  }
}

MiniView.propTypes = propTypes;

import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import get from 'lodash/get';

import { refNameToCsid, refNameToRecordType } from '../../../src/helpers/refNameHelpers';
import MiniView from '../../components/record/MiniView';
import withConfig from '../../enhancers/withConfig';

import {
  getRecordData,
} from '../../reducers';

import {
  readRecord,
} from '../../actions/record';

const mapStateToProps = (state, ownProps) => {
  const {
    config,
    refName,
  } = ownProps;

  const csid = refNameToCsid(refName);
  const recordType = refNameToRecordType(config, refName);
  const data = getRecordData(state, csid);

  return {
    data,
    csid,
    recordType,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    config,
    csid,
    recordType,
    vocabulary,
  } = ownProps;

  const recordTypeConfig = get(config, ['recordTypes', recordType]);

  const vocabularyConfig = vocabulary
    ? get(recordTypeConfig, ['vocabularies', vocabulary])
    : undefined;

  return {
    readRecord: () => {
      dispatch(readRecord(config, recordTypeConfig, vocabularyConfig, csid));
    },
  };
};

export const ConnectedMiniView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MiniView);

const InitializedConnectedMiniView =
  injectIntl(withConfig(ConnectedMiniView));

export default InitializedConnectedMiniView;

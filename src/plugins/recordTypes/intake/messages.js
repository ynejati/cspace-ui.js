import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  record: defineMessages({
    name: {
      id: 'record.intake.name',
      description: 'The name of the record type.',
      defaultMessage: 'Intake',
    },
    collectionName: {
      id: 'record.intake.collectionName',
      description: 'The name of a collection of records of the type.',
      defaultMessage: 'Intakes',
    },
  }),
  panel: defineMessages({
    objectEntryInfo: {
      id: 'panel.intake.objectEntryInfo',
      defaultMessage: 'Object Entry Information',
    },
    objectCollectionInfo: {
      id: 'panel.intake.objectCollectionInfo',
      defaultMessage: 'Object Collection Information',
    },
    valuation: {
      id: 'panel.intake.valuation',
      defaultMessage: 'Valuation Information',
    },
    insurance: {
      id: 'panel.intake.insurance',
      defaultMessage: 'Insurance Information',
    },
    location: {
      id: 'panel.intake.location',
      defaultMessage: 'Location Information',
    },
    condition: {
      id: 'panel.intake.condition',
      defaultMessage: 'Condition Information',
    },
  }),
  inputTable: defineMessages({
    depositor: {
      id: 'inputTable.intake.depositor',
      defaultMessage: 'Depositor',
    },
  }),
};

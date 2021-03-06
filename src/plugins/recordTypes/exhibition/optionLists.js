import { defineMessages } from 'react-intl';

// FIXME: Plugins shouldn't have to import react-intl, since this unnecessarily increases the size
// when built as a standalone package. Instead, defineMessages should be supplied in the
// pluginContext. But this means that messages won't be extracted by the Babel plugin, since it
// only operates on files that import react-intl.

export default {
  exhibitionConsTreatmentStatuses: {
    values: [
      'Needed',
      'Not needed',
      'Done',
    ],
    messages: defineMessages({
      Needed: {
        id: 'option.exhibitionConsTreatmentStatuses.Needed',
        defaultMessage: 'needed',
      },
      'Not needed': {
        id: 'option.exhibitionConsTreatmentStatuses.Not needed',
        defaultMessage: 'not needed',
      },
      Done: {
        id: 'option.exhibitionConsTreatmentStatuses.Done',
        defaultMessage: 'done',
      },
    }),
  },
  exhibitionMountStatuses: {
    values: [
      'Needed',
      'Not needed',
      'Done',
    ],
    messages: defineMessages({
      Needed: {
        id: 'option.exhibitionMountStatuses.Needed',
        defaultMessage: 'needed',
      },
      'Not needed': {
        id: 'option.exhibitionMountStatuses.Not needed',
        defaultMessage: 'not needed',
      },
      Done: {
        id: 'option.exhibitionMountStatuses.Done',
        defaultMessage: 'done',
      },
    }),
  },
};

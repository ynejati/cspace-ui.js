import { defineMessages } from 'react-intl';
import getCoreFields from '../../../helpers/coreFields';

export default (pluginContext) => {
  const {
    CompoundInput,
    ReadOnlyInput,
    UploadInput,
  } = pluginContext.inputComponents;

  const {
    configKey: config,
  } = pluginContext.configHelpers;

  const coreFields = getCoreFields(pluginContext);

  return {
    document: {
      [config]: {
        view: {
          type: CompoundInput,
          props: {
            defaultChildSubpath: 'ns2:blobs_common',
          },
        },
      },
      // Define core fields
      ...coreFields,
      'ns2:blobs_common': {
        [config]: {
          service: {
            ns: 'http://collectionspace.org/services/blob',
          },
        },
        file: {
          [config]: {
            view: {
              type: UploadInput,
            },
          },
        },
        name: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              name: {
                id: 'field.blobs_common.name.name',
                defaultMessage: 'Name',
              },
            }),
            readOnly: true,
            view: {
              type: ReadOnlyInput,
            },
          },
        },
        length: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              name: {
                id: 'field.blobs_common.length.name',
                defaultMessage: 'Size',
              },
              value: {
                id: 'field.blobs_common.length.value',
                defaultMessage: '{value, number} bytes',
              },
            }),
            readOnly: true,
            view: {
              type: ReadOnlyInput,
            },
          },
        },
        mimeType: {
          [config]: {
            cloneable: false,
            messages: defineMessages({
              name: {
                id: 'field.blobs_common.mimeType.name',
                defaultMessage: 'Type',
              },
            }),
            readOnly: true,
            view: {
              type: ReadOnlyInput,
            },
          },
        },
      },
    },
  };
};

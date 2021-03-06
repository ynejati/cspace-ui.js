import locationRecordTypePluginFactory from '../../../../../src/plugins/recordTypes/location';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('location record plugin', function suite() {
  const config = {};
  const locationRecordTypePlugin = locationRecordTypePluginFactory(config);
  const pluginContext = createPluginContext();

  it('should have the correct shape', function test() {
    const pluginConfigContribution = locationRecordTypePlugin(pluginContext);

    const {
      recordTypes,
    } = pluginConfigContribution;

    pluginConfigContribution.should.have.property('optionLists').that.is.an('object');

    recordTypes.should.have.property('location');

    const locationRecordType = recordTypes.location;

    locationRecordType.should.have.property('messages').that.is.an('object');
    locationRecordType.should.have.property('serviceConfig').that.is.an('object');
    locationRecordType.should.have.property('title').that.is.a('function');
    locationRecordType.should.have.property('forms').that.is.an('object');
    locationRecordType.should.have.property('advancedSearch').that.is.an('object');
    locationRecordType.title().should.be.a('string');
    locationRecordType.serviceConfig.quickAddData({ displayName: '' }).should.be.an('object');
  });
});

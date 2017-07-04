import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/conservation/title';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('conservation record title', function suite() {
  const pluginContext = createPluginContext();
  const title = createTitleGetter(pluginContext);

  it('should concat the conservation number and the status', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:conservation_common': {
        conservationNumber: 'CT2017.1',
        conservationStatusGroupList: {
          conservationStatusGroup: [{
            status: 'urn:cspace:core.collectionspace.org:vocabularies:name(conservationstatus):item:name(treatmentapproved)\'Treatment approved\'',
          }, {
            status: 'urn:cspace:core.collectionspace.org:vocabularies:name(conservationstatus):item:name(treatmentapproved)\'Treatment approved\'',
          }],
        },
      },
    });

    title(cspaceDocument).should.equal('CT2017.1 – Treatment approved');
  });

  it('should return the conservation number when the status is empty', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:conservation_common': {
        conservationNumber: 'CT2017.1',
        conservationStatusGroupList: {
          conservationStatusGroup: [],
        },
      },
    });

    title(cspaceDocument).should.equal('CT2017.1');
  });

  it('should return empty string if no document is passed', function test() {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:conservation_extension': {
        conservationNumber: 'CT2017.1',
        conservationStatusGroupList: {
          conservationStatusGroup: [{
            status: 'urn:cspace:core.collectionspace.org:vocabularies:name(conservationstatus):item:name(treatmentapproved)\'Treatment approved\'',
          }, {
            status: 'urn:cspace:core.collectionspace.org:vocabularies:name(conservationstatus):item:name(treatmentapproved)\'Treatment approved\'',
          }],
        },
      },
    });

    title(cspaceDocument).should.equal('');
  });
});

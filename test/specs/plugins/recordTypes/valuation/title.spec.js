import Immutable from 'immutable';
import createTitleGetter from '../../../../../src/plugins/recordTypes/valuation/title';
import createPluginContext from '../../../../../src/helpers/createPluginContext';

chai.should();

describe('valuation record title', function suite() {
  const pluginContext = createPluginContext();
  const title = createTitleGetter(pluginContext);

  it('should concat the valuation number and the value type', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:valuationcontrols_common': {
        valuationcontrolRefNumber: 'VAL2017.1',
        valueType: 'current-value',
      },
    });

    title(cspaceDocument).should.equal('VAL2017.1 – current-value');
  });

  it('should return the valuation number when the value type is empty', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:valuationcontrols_common': {
        valuationcontrolRefNumber: 'VAL2017.1',
      },
    });

    title(cspaceDocument).should.equal('VAL2017.1');
  });

  it('should return empty string if no document is passed', function test() {
    title(null).should.equal('');
    title(undefined).should.equal('');
  });

  it('should return empty string if the common part is not present', function test() {
    const cspaceDocument = Immutable.fromJS({
      'ns2:valuationcontrols_extension': {
        valuationcontrolRefNumber: 'VAL2017.1',
        valueType: 'current-value',
      },
    });

    title(cspaceDocument).should.equal('');
  });
});

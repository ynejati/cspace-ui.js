import React from 'react';
import Immutable from 'immutable';

import { components as inputComponents } from 'cspace-input';
import { Col, Cols, Row } from 'cspace-layout';
import { getDisplayName } from 'cspace-refname';

import DateInputContainer from '../containers/input/DateInputContainer';
import IDGeneratorInputContainer from '../containers/input/IDGeneratorInputContainer';
import AutocompleteInputContainer from '../containers/input/AutocompleteInputContainer';
import OptionPickerInputContainer from '../containers/input/OptionPickerInputContainer';
import StructuredDateInputContainer from '../containers/input/StructuredDateInputContainer';
import TermPickerInputContainer from '../containers/input/TermPickerInputContainer';

import Panel from '../containers/layout/PanelContainer';
import Field from '../components/record/Field';
import HierarchyInput from '../components/record/HierarchyInput';
import InputTable from '../components/record/InputTable';

import * as dataTypes from '../constants/dataTypes';

import withBooleanValue from '../enhancers/withBooleanValue';

import {
  configKey,
} from '../helpers/configHelpers';

import {
  deepGet,
  getPart,
  getPartPropertyName,
} from '../helpers/recordDataHelpers';

const {
  CheckboxInput: BaseCheckboxInput,
  CompoundInput,
  TextInput,
} = inputComponents;

const AutocompleteInput = AutocompleteInputContainer;
const IDGeneratorInput = IDGeneratorInputContainer;
const DateInput = DateInputContainer;
const OptionPickerInput = OptionPickerInputContainer;
const StructuredDateInput = StructuredDateInputContainer;
const TermPickerInput = TermPickerInputContainer;
const CheckboxInput = withBooleanValue(BaseCheckboxInput);

export default () => ({
  dataTypes,
  lib: {
    Immutable,
    React,
  },
  inputComponents: {
    AutocompleteInput,
    CheckboxInput,
    CompoundInput,
    DateInput,
    HierarchyInput,
    IDGeneratorInput,
    OptionPickerInput,
    StructuredDateInput,
    TextInput,
    TermPickerInput,
  },
  layoutComponents: {
    Col,
    Cols,
    Panel,
    Row,
  },
  recordComponents: {
    Field,
    InputTable,
  },
  configHelpers: {
    configKey,
  },
  recordDataHelpers: {
    deepGet,
    getPart,
    getPartPropertyName,
  },
  refNameHelpers: {
    getDisplayName,
  },
});

import {
  MAP_HAS_MULTIPLE_START_CHAR,
  MAP_MISSING_END_CHAR,
  MAP_MISSING_START_CHAR,
  VALID_MAP,
} from '@mock/mapAnalyzer/inputs/validInputs';
import { MapAnalyzerGetStartPositionUnitTest } from '../types';

const VALID_EXAMPLE: MapAnalyzerGetStartPositionUnitTest = {
  name: 'should find start position for valid input',
  input: VALID_MAP,
  validOutput: {
    char: '@',
    x: 0,
    y: 0,
    start: true,
  },
};

const MISSING_START_CHAR_EXAMPLE: MapAnalyzerGetStartPositionUnitTest = {
  name: 'should throw exception for missing start character (@)',
  input: MAP_MISSING_START_CHAR,
  invalidOutput: {
    errorCode: 3,
    errorMessage: 'Map is missing start character (@)',
  },
};

const MULTIPLE_START_CHAR_EXAMPLE: MapAnalyzerGetStartPositionUnitTest = {
  name: 'should throw exception for multiple start character (@)',
  input: MAP_HAS_MULTIPLE_START_CHAR,
  invalidOutput: {
    errorCode: 2,
    errorMessage: 'There are multiple start characters (@) at location [2][2] and [1][0]',
  },
};

const MISSING_END_CHAR_EXAMPLE: MapAnalyzerGetStartPositionUnitTest = {
  name: 'should throw exception for missing end character (x)',
  input: MAP_MISSING_END_CHAR,
  invalidOutput: {
    errorCode: 7,
    errorMessage: 'Map is missing end character (x)',
  },
};

export const START_POSITION_DATA: MapAnalyzerGetStartPositionUnitTest[] = [
  VALID_EXAMPLE,
  MISSING_START_CHAR_EXAMPLE,
  MULTIPLE_START_CHAR_EXAMPLE,
  MISSING_END_CHAR_EXAMPLE,
];

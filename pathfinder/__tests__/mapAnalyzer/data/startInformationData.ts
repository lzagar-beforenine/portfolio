import {
  MULTIPLE_PATHS_CONNECTED_TO_START_MAP,
  START_NOT_CONNECTED_TO_PATH_MAP,
  VALID_MAP,
} from '@mock/mapAnalyzer/inputs/validInputs';
import { MapAnalyzerGetStartInformationUnitTest } from '../types';

const VALID_EXAMPLE: MapAnalyzerGetStartInformationUnitTest = {
  name: 'should find next position for valid start input',
  input: { map: VALID_MAP, start: { char: '@', x: 0, y: 0 } },
  validOutput: {
    direction: 4,
    x: 1,
    y: 0,
  },
};

const MULTIPLE_PATHS_CONNECTED_TO_START_EXAMPLE: MapAnalyzerGetStartInformationUnitTest = {
  name: 'should throw exception for more than one path connected to start input',
  input: { map: MULTIPLE_PATHS_CONNECTED_TO_START_MAP, start: { char: '@', x: 0, y: 0 } },
  invalidOutput: {
    errorCode: 5,
    errorMessage: 'Start character (@) at location [0][0] has multiple paths connected to it',
  },
};

const START_NOT_CONNECTED_TO_PATH_EXAMPLE: MapAnalyzerGetStartInformationUnitTest = {
  name: 'should throw exception for start input not connected to any path',
  input: { map: START_NOT_CONNECTED_TO_PATH_MAP, start: { char: '@', x: 0, y: 0 } },
  invalidOutput: {
    errorCode: 4,
    errorMessage: 'Start character (@) at location [0][0] is not connected to any path',
  },
};

export const START_INFORMATION_DATA: MapAnalyzerGetStartInformationUnitTest[] = [
  VALID_EXAMPLE,
  MULTIPLE_PATHS_CONNECTED_TO_START_EXAMPLE,
  START_NOT_CONNECTED_TO_PATH_EXAMPLE,
];

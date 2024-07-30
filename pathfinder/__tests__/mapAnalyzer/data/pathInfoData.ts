import { VALID_MAP } from '@mock/mapAnalyzer/inputs/validInputs';
import { MapAnalyzerUnitTest } from '../types';
import { LocationInformation, PathInformation } from '@src/types';

const EXAMPLE_COORDINATES = {
  x: 0,
  y: 0,
};

export const GET_PATH_INFO_INPUTS: MapAnalyzerUnitTest<LocationInformation, PathInformation> = {
  functionName: 'getPathInfo',
  map: VALID_MAP,
  testCases: [
    {
      name: 'validate and enrich start char (@)',
      input: { ...EXAMPLE_COORDINATES, char: '@' },
      validOutput: { ...EXAMPLE_COORDINATES, char: '@', start: true },
    },
    {
      name: 'validate and enrich piece of path char (-)',
      input: { ...EXAMPLE_COORDINATES, char: '-' },
      validOutput: { ...EXAMPLE_COORDINATES, char: '-', pieceOfPath: true },
    },
    {
      name: 'validate and enrich piece of path char (+)',
      input: { ...EXAMPLE_COORDINATES, char: '+' },
      validOutput: { ...EXAMPLE_COORDINATES, char: '+', pieceOfPath: true },
    },
    {
      name: 'validate and enrich piece of path char (|)',
      input: { ...EXAMPLE_COORDINATES, char: '|' },
      validOutput: { ...EXAMPLE_COORDINATES, char: '|', pieceOfPath: true },
    },
    {
      name: 'validate and enrich piece of path char (C)',
      input: { ...EXAMPLE_COORDINATES, char: 'C' },
      validOutput: { ...EXAMPLE_COORDINATES, char: 'C', pieceOfPath: true },
    },
    {
      name: 'validate and enrich end char (x)',
      input: { ...EXAMPLE_COORDINATES, char: 'x' },
      validOutput: { ...EXAMPLE_COORDINATES, char: 'x', end: true },
    },
    {
      name: 'validate and enrich empty char ( )',
      input: { ...EXAMPLE_COORDINATES, char: ' ' },
      validOutput: { ...EXAMPLE_COORDINATES, char: ' ', emptyPath: true },
    },
    {
      name: 'throw exception for non valid characters (1)',
      input: { ...EXAMPLE_COORDINATES, char: '1' },
      invalidOutput: {
        errorCode: 1,
        errorMessage: 'Character 1 at location [0][0] is not valid character',
      },
    },
    {
      name: 'throw exception for non valid characters (a)',
      input: { ...EXAMPLE_COORDINATES, char: 'a' },
      invalidOutput: {
        errorCode: 1,
        errorMessage: 'Character a at location [0][0] is not valid character',
      },
    },
  ],
};

import { VALID_MAP } from '@mock/mapAnalyzer/inputs/validInputs';
import { MapAnalyzerUnitTest } from '../types';
import { Coordinates } from '@src/types';

export const CHAR_DATA: MapAnalyzerUnitTest<Coordinates, string> = {
  functionName: 'getChar',
  map: VALID_MAP,
  testCases: [
    {
      name: 'should find char (@) for given position',
      input: { x: 0, y: 0 },
      validOutput: '@',
    },
    {
      name: 'should find char (-) for given position',
      input: { x: 1, y: 0 },
      validOutput: '-',
    },
    {
      name: 'should find char ( ) for given position',
      input: { x: 0, y: 1 },
      validOutput: ' ',
    },
    {
      name: 'should throw error for x position outside of grid',
      input: { x: -1, y: 0 },
      invalidOutput: {
        errorCode: 9,
        errorMessage: 'Path is out of bounds of map at location [-1][0]',
      },
    },
    {
      name: 'should throw error for x position outside of grid',
      input: { x: 10, y: 0 },
      invalidOutput: {
        errorCode: 9,
        errorMessage: 'Path is out of bounds of map at location [10][0]',
      },
    },
    {
      name: 'should throw error for y position outside of grid',
      input: { x: 0, y: -1 },
      invalidOutput: {
        errorCode: 9,
        errorMessage: 'Path is out of bounds of map at location [0][-1]',
      },
    },
    {
      name: 'should throw error for y position outside of grid',
      input: { x: 0, y: 10 },
      invalidOutput: {
        errorCode: 9,
        errorMessage: 'Path is out of bounds of map at location [0][10]',
      },
    },
  ],
};

import { VALID_MAP } from '@mock/mapAnalyzer/inputs/validInputs';
import { MapAnalyzerUnitTest } from '../types';
import { Coordinates } from '@src/types';

export const CHECK_IF_COORDINATES_ARE_IN_GRID: MapAnalyzerUnitTest<Coordinates, boolean> = {
  functionName: 'checkIfCoordinatesAreInGrid',
  map: VALID_MAP,
  testCases: [
    {
      name: 'should return true for coordinates in grid',
      input: { x: 0, y: 0 },
      validOutput: true,
    },
    {
      name: 'should return false for x coordinate outside left side of grid',
      input: { x: -1, y: 0 },
      validOutput: false,
    },
    {
      name: 'should return false for x coordinate outside right side of grid',
      input: { x: 10, y: 0 },
      validOutput: false,
    },
    {
      name: 'should return false for y coordinate outside top side of grid',
      input: { x: 0, y: -1 },
      validOutput: false,
    },
    {
      name: 'should return false for y coordinate outside bottom side of grid',
      input: { x: 0, y: 10 },
      validOutput: false,
    },
    {
      name: 'should return false for x and y coordinate outside of grid',
      input: { x: -1, y: -1 },
      validOutput: false,
    },
    {
      name: 'should return false for x and y coordinate outside of grid',
      input: { x: 10, y: 10 },
      validOutput: false,
    },
  ],
};

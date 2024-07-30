import { VALID_MAP_WITH_INTERSECTION } from '@mock/mapAnalyzer/inputs/validInputs';
import { NextCoordinates } from '@src/types';
import { MapAnalyzerUnitTest } from '../types';

export const PATH_CONNECTED_DATA: MapAnalyzerUnitTest<NextCoordinates, boolean> = {
  functionName: 'isPathConnected',
  map: VALID_MAP_WITH_INTERSECTION,
  testCases: [
    {
      name: 'should return true if path is connected for right direction',
      input: { x: 0, y: 3, direction: 4 },
      validOutput: true,
    },
    {
      name: 'should return true if path is connected for up direction',
      input: { x: 0, y: 1, direction: 1 },
      validOutput: true,
    },
    {
      name: 'should return true if path is connected for down direction',
      input: { x: 0, y: 1, direction: 2 },
      validOutput: true,
    },
    {
      name: 'should return true if path is connected for left direction',
      input: { x: 1, y: 3, direction: 3 },
      validOutput: true,
    },
    {
      name: 'should return false if path is comes to intersection for down direction',
      input: { x: 2, y: 3, direction: 2 },
      validOutput: false,
    },
    {
      name: 'should return false if path is comes to intersection for up direction',
      input: { x: 2, y: 3, direction: 1 },
      validOutput: false,
    },
    {
      name: 'should return false if path is not connected for right direction',
      input: { x: 1, y: 2, direction: 4 },
      validOutput: false,
    },
    {
      name: 'should return false if path is not connected for up direction',
      input: { x: 2, y: 3, direction: 1 },
      validOutput: false,
    },
    {
      name: 'should return false if path is not connected for down direction',
      input: { x: 0, y: 4, direction: 2 },
      validOutput: false,
    },
    {
      name: 'should return false if path is not connected for left direction',
      input: { x: 1, y: 1, direction: 3 },
      validOutput: false,
    },
  ],
};

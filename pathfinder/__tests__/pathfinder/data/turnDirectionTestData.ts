import {
  DOWN_INPUT,
  RIGHT_LEFT_INPUT,
  UP_DOWN_INPUT,
  LEFT_INPUT,
  MULTIPLE_PATHS_INPUT,
  MULTIPLE_PATHS_MISSING_DOWN_PATH_INPUT,
  MULTIPLE_PATHS_MISSING_LEFT_PATH_INPUT,
  MULTIPLE_PATHS_MISSING_RIGHT_PATH_INPUT,
  MULTIPLE_PATHS_MISSING_UP_PATH_INPUT,
  RIGHT_INPUT,
  UP_INPUT,
} from '@mock/pathfinder/inputs/pieceOfPath';
import { PieceOfPathExample, PieceOfPathInvalidExample, UnitTestCases } from '../types';

const START_COORDINATES = {
  x: 1,
  y: 1,
} as const;

const DOWN_TURN_EXAMPLE: PieceOfPathExample = {
  name: 'properly handle down turn',
  input: DOWN_INPUT('+'),
  startCoordinates: START_COORDINATES,
  validDirections: {
    3: { direction: 2, y: 2, x: 1 },
    4: { direction: 2, y: 2, x: 1 },
  },
  invalidDirections: {
    1: { errorCode: 8, errorMessage: 'Path is broken at location [1][1]' },
    2: { errorCode: 10, errorMessage: 'Fake turn at location [1][1]' },
  },
};

const UP_TURN_EXAMPLE: PieceOfPathExample = {
  name: 'properly handle up turn',
  input: UP_INPUT('+'),
  startCoordinates: START_COORDINATES,
  validDirections: {
    3: { direction: 1, y: 0, x: 1 },
    4: { direction: 1, y: 0, x: 1 },
  },
  invalidDirections: {
    2: { errorCode: 8, errorMessage: 'Path is broken at location [1][1]' },
    1: { errorCode: 10, errorMessage: 'Fake turn at location [1][1]' },
  },
};

const LEFT_TURN_EXAMPLE: PieceOfPathExample = {
  name: 'properly handle left turn',
  input: LEFT_INPUT('+'),
  startCoordinates: START_COORDINATES,
  validDirections: {
    1: { direction: 3, y: 1, x: 0 },
    2: { direction: 3, y: 1, x: 0 },
  },
  invalidDirections: {
    4: { errorCode: 8, errorMessage: 'Path is broken at location [1][1]' },
    3: { errorCode: 10, errorMessage: 'Fake turn at location [1][1]' },
  },
};

const RIGHT_TURN_EXAMPLE: PieceOfPathExample = {
  name: 'properly handle right turn',
  input: RIGHT_INPUT('+'),
  startCoordinates: START_COORDINATES,
  validDirections: {
    1: { direction: 4, y: 1, x: 2 },
    2: { direction: 4, y: 1, x: 2 },
  },
  invalidDirections: {
    3: { errorCode: 8, errorMessage: 'Path is broken at location [1][1]' },
    4: { errorCode: 10, errorMessage: 'Fake turn at location [1][1]' },
  },
};

export const TURN_INPUTS: UnitTestCases<PieceOfPathExample> = {
  functionName: 'getTurnDirection',
  testCases: [DOWN_TURN_EXAMPLE, UP_TURN_EXAMPLE, LEFT_TURN_EXAMPLE, RIGHT_TURN_EXAMPLE],
};

const FAKE_RIGHT_LEFT_TURN_EXAMPLE: PieceOfPathInvalidExample = {
  name: 'fake right or left turn',
  input: RIGHT_LEFT_INPUT('+'),
  startCoordinates: START_COORDINATES,
  expectedOutput: {
    errorCode: 10,
    errorMessage: 'Fake turn at location [1][1]',
  },
};

const FAKE_UP_DOWN_TURN_EXAMPLE: PieceOfPathInvalidExample = {
  name: 'fake up or down turn',
  input: UP_DOWN_INPUT('+'),
  startCoordinates: START_COORDINATES,
  expectedOutput: {
    errorCode: 10,
    errorMessage: 'Fake turn at location [1][1]',
  },
};

const MULTIPLE_PATHS_MISSING_DOWN_PATH_EXAMPLE: PieceOfPathInvalidExample = {
  name: 'multiple paths while missing down connection',
  input: MULTIPLE_PATHS_MISSING_DOWN_PATH_INPUT('+'),
  startCoordinates: START_COORDINATES,
  expectedOutput: {
    errorCode: 10,
    errorMessage: 'Fake turn at location [1][1]',
  },
};

const MULTIPLE_PATHS_MISSING_UP_PATH_EXAMPLE: PieceOfPathInvalidExample = {
  name: 'multiple paths while missing up connection',
  input: MULTIPLE_PATHS_MISSING_UP_PATH_INPUT('+'),
  startCoordinates: START_COORDINATES,
  expectedOutput: {
    errorCode: 10,
    errorMessage: 'Fake turn at location [1][1]',
  },
};

const MULTIPLE_PATHS_MISSING_RIGHT_PATH_EXAMPLE: PieceOfPathInvalidExample = {
  name: 'multiple paths while missing right connection',
  input: MULTIPLE_PATHS_MISSING_RIGHT_PATH_INPUT('+'),
  startCoordinates: START_COORDINATES,
  expectedOutput: {
    errorCode: 10,
    errorMessage: 'Fake turn at location [1][1]',
  },
};

const MULTIPLE_PATHS_MISSING_LEFT_PATH_EXAMPLE: PieceOfPathInvalidExample = {
  name: 'multiple paths while missing left connection',
  input: MULTIPLE_PATHS_MISSING_LEFT_PATH_INPUT('+'),
  startCoordinates: START_COORDINATES,
  expectedOutput: {
    errorCode: 10,
    errorMessage: 'Fake turn at location [1][1]',
  },
};

const MULTIPLE_PATHS_EXAMPLE: PieceOfPathInvalidExample = {
  name: 'multiple paths connection',
  input: MULTIPLE_PATHS_INPUT('+'),
  startCoordinates: START_COORDINATES,
  expectedOutput: {
    errorCode: 10,
    errorMessage: 'Fake turn at location [1][1]',
  },
};

export const INVALID_TURN_INPUTS: UnitTestCases<PieceOfPathInvalidExample> = {
  functionName: 'getTurnDirection',
  testCases: [
    FAKE_RIGHT_LEFT_TURN_EXAMPLE,
    FAKE_UP_DOWN_TURN_EXAMPLE,
    MULTIPLE_PATHS_MISSING_DOWN_PATH_EXAMPLE,
    MULTIPLE_PATHS_MISSING_UP_PATH_EXAMPLE,
    MULTIPLE_PATHS_MISSING_RIGHT_PATH_EXAMPLE,
    MULTIPLE_PATHS_MISSING_LEFT_PATH_EXAMPLE,
    MULTIPLE_PATHS_EXAMPLE,
  ],
};

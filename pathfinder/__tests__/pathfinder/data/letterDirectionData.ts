import {
  DOWN_INPUT,
  LEFT_INPUT,
  MULTIPLE_PATHS_INPUT,
  MULTIPLE_PATHS_MISSING_DOWN_PATH_INPUT,
  MULTIPLE_PATHS_MISSING_LEFT_PATH_INPUT,
  MULTIPLE_PATHS_MISSING_RIGHT_PATH_INPUT,
  MULTIPLE_PATHS_MISSING_UP_PATH_INPUT,
  RIGHT_INPUT,
  RIGHT_LEFT_INPUT,
  UP_DOWN_INPUT,
  UP_INPUT,
} from '@mock/pathfinder/inputs/pieceOfPath';
import { PieceOfPathExample, PieceOfPathInvalidExample, UnitTestCases } from '../types';

const START_COORDINATES = {
  x: 1,
  y: 1,
} as const;

const DOWN_EXAMPLE: PieceOfPathExample = {
  name: 'properly handle down letter input',
  input: DOWN_INPUT('A'),
  startCoordinates: START_COORDINATES,
  validDirections: {
    2: { direction: 2, y: 2, x: 1 },
    3: { direction: 2, y: 2, x: 1 },
    4: { direction: 2, y: 2, x: 1 },
  },
  invalidDirections: {
    1: { errorCode: 8, errorMessage: 'Path is broken at location [1][1]' },
  },
};

const UP_EXAMPLE: PieceOfPathExample = {
  name: 'properly handle up letter input',
  input: UP_INPUT('A'),
  startCoordinates: START_COORDINATES,

  validDirections: {
    1: { direction: 1, y: 0, x: 1 },
    3: { direction: 1, y: 0, x: 1 },
    4: { direction: 1, y: 0, x: 1 },
  },
  invalidDirections: {
    2: { errorCode: 8, errorMessage: 'Path is broken at location [1][1]' },
  },
};

const LEFT_EXAMPLE: PieceOfPathExample = {
  name: 'properly handle left letter input',
  input: LEFT_INPUT('A'),
  startCoordinates: START_COORDINATES,

  validDirections: {
    1: { direction: 3, y: 1, x: 0 },
    2: { direction: 3, y: 1, x: 0 },
    3: { direction: 3, y: 1, x: 0 },
  },
  invalidDirections: {
    4: { errorCode: 8, errorMessage: 'Path is broken at location [1][1]' },
  },
};

const RIGHT_EXAMPLE: PieceOfPathExample = {
  name: 'properly handle right letter input',
  input: RIGHT_INPUT('A'),
  startCoordinates: START_COORDINATES,

  validDirections: {
    1: { direction: 4, y: 1, x: 2 },
    2: { direction: 4, y: 1, x: 2 },
    4: { direction: 4, y: 1, x: 2 },
  },
  invalidDirections: {
    3: {
      errorCode: 8,
      errorMessage: 'Path is broken at location [1][1]',
    },
  },
};

const RIGHT_LEFT_EXAMPLE: PieceOfPathExample = {
  name: 'properly handle right and left connected path for letter input',
  input: RIGHT_LEFT_INPUT('A'),
  startCoordinates: START_COORDINATES,
  validDirections: {
    3: { direction: 3, y: 1, x: 0 },
    4: { direction: 4, y: 1, x: 2 },
  },
  invalidDirections: {
    1: {
      errorCode: 10,
      errorMessage: 'Fake turn at location [1][1]',
    },
    2: {
      errorCode: 10,
      errorMessage: 'Fake turn at location [1][1]',
    },
  },
};

const UP_DOWN_EXAMPLE: PieceOfPathExample = {
  name: 'properly handle up and down connected path for letter input',
  input: UP_DOWN_INPUT('A'),
  startCoordinates: START_COORDINATES,
  validDirections: {
    1: { direction: 1, y: 0, x: 1 },
    2: { direction: 2, y: 2, x: 1 },
  },
  invalidDirections: {
    3: {
      errorCode: 10,
      errorMessage: 'Fake turn at location [1][1]',
    },
    4: {
      errorCode: 10,
      errorMessage: 'Fake turn at location [1][1]',
    },
  },
};

const MULTIPLE_PATH_EXAMPLE: PieceOfPathExample = {
  name: 'properly handle multiple path letter input',
  input: MULTIPLE_PATHS_INPUT('A'),
  startCoordinates: START_COORDINATES,

  validDirections: {
    1: { direction: 1, y: 0, x: 1 },
    2: { direction: 2, y: 2, x: 1 },
    3: { direction: 3, y: 1, x: 0 },
    4: { direction: 4, y: 1, x: 2 },
  },
  invalidDirections: {},
};

export const LETTER_INPUTS: UnitTestCases<PieceOfPathExample> = {
  functionName: 'getLetterDirection',
  testCases: [
    DOWN_EXAMPLE,
    UP_EXAMPLE,
    LEFT_EXAMPLE,
    RIGHT_EXAMPLE,
    RIGHT_LEFT_EXAMPLE,
    UP_DOWN_EXAMPLE,
    MULTIPLE_PATH_EXAMPLE,
  ],
};

const MULTIPLE_PATHS_MISSING_DOWN_PATH_EXAMPLE: PieceOfPathInvalidExample = {
  name: 'multiple paths while missing down connection',
  input: MULTIPLE_PATHS_MISSING_DOWN_PATH_INPUT('A'),
  startCoordinates: START_COORDINATES,
  expectedOutput: {
    errorCode: 10,
    errorMessage: 'Fake turn at location [1][1]',
  },
};

const MULTIPLE_PATHS_MISSING_UP_PATH_EXAMPLE: PieceOfPathInvalidExample = {
  name: 'multiple paths while missing up connection',
  input: MULTIPLE_PATHS_MISSING_UP_PATH_INPUT('A'),
  startCoordinates: START_COORDINATES,
  expectedOutput: {
    errorCode: 10,
    errorMessage: 'Fake turn at location [1][1]',
  },
};

const MULTIPLE_PATHS_MISSING_RIGHT_PATH_EXAMPLE: PieceOfPathInvalidExample = {
  name: 'multiple paths while missing right connection',
  input: MULTIPLE_PATHS_MISSING_RIGHT_PATH_INPUT('A'),
  startCoordinates: START_COORDINATES,
  expectedOutput: {
    errorCode: 10,
    errorMessage: 'Fake turn at location [1][1]',
  },
};

const MULTIPLE_PATHS_MISSING_LEFT_PATH_EXAMPLE: PieceOfPathInvalidExample = {
  name: 'multiple paths while missing left connection',
  input: MULTIPLE_PATHS_MISSING_LEFT_PATH_INPUT('A'),
  startCoordinates: START_COORDINATES,
  expectedOutput: {
    errorCode: 10,
    errorMessage: 'Fake turn at location [1][1]',
  },
};

export const INVALID_LETTER_INPUTS: UnitTestCases<PieceOfPathInvalidExample> = {
  functionName: 'getLetterDirection',
  testCases: [
    MULTIPLE_PATHS_MISSING_DOWN_PATH_EXAMPLE,
    MULTIPLE_PATHS_MISSING_UP_PATH_EXAMPLE,
    MULTIPLE_PATHS_MISSING_RIGHT_PATH_EXAMPLE,
    MULTIPLE_PATHS_MISSING_LEFT_PATH_EXAMPLE,
  ],
};

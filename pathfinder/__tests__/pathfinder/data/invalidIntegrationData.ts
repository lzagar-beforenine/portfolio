import { InvalidIntegrationTestExample } from '@tests/pathfinder/types';
import {
  FAKE_TURN_INPUT,
  FORK_NOT_VALID_INPUT,
  MISSING_END_CHARACTER_INPUT,
  MISSING_START_CHARACTER_INPUT,
  MULTIPLE_DIRECTIONS_LETTER_INPUT,
  MULTIPLE_START_CHARACTERS_INPUT,
  MULTIPLE_STARTING_PATHS_INPUT,
  NON_VALID_CHARACTER_INPUT,
  PATH_BROKEN_INPUT,
  PATH_OUTSIDE_BOUNDS_INPUT,
  START_CHAR_NOT_CONNECTED_INPUT,
} from '@mock/pathfinder/inputs/invalidInputs';

const NON_VALID_CHARACTER_EXAMPLE: InvalidIntegrationTestExample = {
  name: 'non valid character',
  input: NON_VALID_CHARACTER_INPUT,
  error: {
    code: 1,
    message: 'Character 1 at location [0][0] is not valid character',
  },
};

const MISSING_START_CHARACTER_EXAMPLE: InvalidIntegrationTestExample = {
  name: 'missing start character',
  input: MISSING_START_CHARACTER_INPUT,
  error: {
    code: 3,
    message: 'Map is missing start character (@)',
  },
};

const MISSING_END_CHARACTER_EXAMPLE: InvalidIntegrationTestExample = {
  name: 'missing end character',
  input: MISSING_END_CHARACTER_INPUT,
  error: {
    code: 7,
    message: 'Map is missing end character (x)',
  },
};

const MULTIPLE_START_CHARACTERS_EXAMPLE: InvalidIntegrationTestExample = {
  name: 'multiple start characters',
  input: MULTIPLE_START_CHARACTERS_INPUT,
  error: {
    code: 2,
    message: 'There are multiple start characters (@) at location [6][0] and [1][0]',
  },
};

const MULTIPLE_DIRECTIONS_LETTER_EXAMPLE: InvalidIntegrationTestExample = {
  name: 'multiple directions for letter',
  input: MULTIPLE_DIRECTIONS_LETTER_INPUT,
  error: {
    code: 10,
    message: 'Fake turn at location [4][1]',
  },
};

const MULTIPLE_STARTING_PATHS_EXAMPLE: InvalidIntegrationTestExample = {
  name: 'multiple starting path',
  input: MULTIPLE_STARTING_PATHS_INPUT,
  error: {
    code: 5,
    message: 'Start character (@) at location [0][0] has multiple paths connected to it',
  },
};

const START_CHAR_NOT_CONNECTED_EXAMPLE: InvalidIntegrationTestExample = {
  name: 'start char not connected',
  input: START_CHAR_NOT_CONNECTED_INPUT,
  error: {
    code: 4,
    message: 'Start character (@) at location [0][2] is not connected to any path',
  },
};

const PATH_BROKEN_EXAMPLE: InvalidIntegrationTestExample = {
  name: 'turn broken path',
  input: PATH_BROKEN_INPUT,
  error: {
    code: 8,
    message: 'Path is broken at location [5][0]',
  },
};

const FORK_NOT_VALID_EXAMPLE: InvalidIntegrationTestExample = {
  name: 'broken path',
  input: FORK_NOT_VALID_INPUT,
  error: {
    code: 8,
    message: 'Path is broken at location [5][2]',
  },
};

const FAKE_TURN_EXAMPLE: InvalidIntegrationTestExample = {
  name: 'fake turn',
  input: FAKE_TURN_INPUT,
  error: {
    code: 10,
    message: 'Fake turn at location [4][0]',
  },
};

const PATH_OUTSIDE_BOUNDS_EXAMPLE: InvalidIntegrationTestExample = {
  name: 'direction out of bounds',
  input: PATH_OUTSIDE_BOUNDS_INPUT,
  error: {
    code: 9,
    message: 'Path is out of bounds of map at location [5][0]',
  },
};

export const INVALID_INPUTS: InvalidIntegrationTestExample[] = [
  NON_VALID_CHARACTER_EXAMPLE,
  MISSING_START_CHARACTER_EXAMPLE,
  MULTIPLE_START_CHARACTERS_EXAMPLE,
  MULTIPLE_STARTING_PATHS_EXAMPLE,
  START_CHAR_NOT_CONNECTED_EXAMPLE,
  MISSING_END_CHARACTER_EXAMPLE,
  MULTIPLE_DIRECTIONS_LETTER_EXAMPLE,
  PATH_BROKEN_EXAMPLE,
  FORK_NOT_VALID_EXAMPLE,
  FAKE_TURN_EXAMPLE,
  PATH_OUTSIDE_BOUNDS_EXAMPLE,
];

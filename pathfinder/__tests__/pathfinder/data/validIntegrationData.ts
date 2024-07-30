import {
  BASIC_INPUT,
  COMPACT_SPACE_INPUT,
  IGNORE_DISCONNECTED_PATHS_INPUT,
  IGNORE_INVALID_PATH_AFTER_END_INPUT,
  IGNORE_STUFF_AFTER_END_INPUT,
  INTERSECTION_INPUT,
  LETTER_INTERSECTION_INPUT,
  LETTER_TURN_INPUT,
  MULTIPLE_EXITS_INPUT,
  SHORT_PATH_INPUT,
} from '@mock/pathfinder/inputs/validInputs';
import { ValidIntegrationTestExample } from '../types';

const BASIC_EXAMPLE: ValidIntegrationTestExample = {
  name: 'with basic input',
  input: BASIC_INPUT,
  expectedOutput: {
    letters: 'ACB',
    path: '@---A---+|C|+---+|+-B-x',
  },
};

const LETTER_TURN_EXAMPLE: ValidIntegrationTestExample = {
  name: 'if letter acts as turn',
  input: LETTER_TURN_INPUT,
  expectedOutput: {
    letters: 'ACB',
    path: '@---A---+|||C---+|+-B-x',
  },
};

const INTERSECTION_EXAMPLE: ValidIntegrationTestExample = {
  name: 'if there is an intersection',
  input: INTERSECTION_INPUT,
  expectedOutput: {
    letters: 'ABCD',
    path: '@|A+---B--+|+--C-+|-||+---D--+|x',
  },
};

const LETTER_INTERSECTION_EXAMPLE: ValidIntegrationTestExample = {
  name: 'if letter acts as an intersection',
  input: LETTER_INTERSECTION_INPUT,
  expectedOutput: {
    letters: 'GOONIES',
    path: '@-G-O-+|+-+|O||+-O-N-+|I|+-+|+-I-+|ES|x',
  },
};

const COMPACT_SPACE_EXAMPLE: ValidIntegrationTestExample = {
  name: 'in compact space',
  input: COMPACT_SPACE_INPUT,
  expectedOutput: {
    letters: 'BLAH',
    path: '@B+++B|+-L-+A+++A-+Hx',
  },
};

const IGNORE_STUFF_AFTER_END_EXAMPLE: ValidIntegrationTestExample = {
  name: 'and ignore stuff after',
  input: IGNORE_STUFF_AFTER_END_INPUT,
  expectedOutput: {
    letters: 'AB',
    path: '@-A--+|+-B--x',
  },
};

const MULTIPLE_EXITS_EXAMPLE: ValidIntegrationTestExample = {
  name: 'and ignore multiple exit characters',
  input: MULTIPLE_EXITS_INPUT,
  expectedOutput: {
    letters: 'A',
    path: '@-A-x',
  },
};

const IGNORE_INVALID_PATH_AFTER_EXIT_EXAMPLE: ValidIntegrationTestExample = {
  name: 'and ignore invalid path after exit',
  input: IGNORE_INVALID_PATH_AFTER_END_INPUT,
  expectedOutput: {
    letters: 'A',
    path: '@-A-x',
  },
};

const IGNORE_DISCONNECTED_PATHS_EXAMPLE: ValidIntegrationTestExample = {
  name: 'and ignore disconnected paths',
  input: IGNORE_DISCONNECTED_PATHS_INPUT,
  expectedOutput: {
    letters: 'A',
    path: '@-A-x',
  },
};

const SHORT_PATH_EXAMPLE: ValidIntegrationTestExample = {
  name: 'with short path',
  input: SHORT_PATH_INPUT,
  expectedOutput: {
    letters: '',
    path: '@x',
  },
};

export const VALID_INTEGRATION_INPUTS: ValidIntegrationTestExample[] = [
  BASIC_EXAMPLE,
  LETTER_TURN_EXAMPLE,
  INTERSECTION_EXAMPLE,
  LETTER_INTERSECTION_EXAMPLE,
  COMPACT_SPACE_EXAMPLE,
  IGNORE_STUFF_AFTER_END_EXAMPLE,
  MULTIPLE_EXITS_EXAMPLE,
  IGNORE_INVALID_PATH_AFTER_EXIT_EXAMPLE,
  IGNORE_DISCONNECTED_PATHS_EXAMPLE,
  SHORT_PATH_EXAMPLE,
] as const;

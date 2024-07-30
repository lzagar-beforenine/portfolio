import { Direction } from '@src/constants/pathfinder/enums';
import { Coordinates, LocationInformation, PathInformation } from '@src/types';

const LETTER_A_ASCII_CODE = 65;
const NUMBER_OF_LETTERS_IN_ALPHABET = 26;

function erichInformationWithPathType(key: keyof PathInformation) {
  return (info: LocationInformation): PathInformation => ({
    ...info,
    [key]: true,
  });
}

export const ALPHABET: Record<string, (info: LocationInformation) => PathInformation> = Array.from(
  { length: NUMBER_OF_LETTERS_IN_ALPHABET },
  (_, i) => String.fromCharCode(i + LETTER_A_ASCII_CODE),
).reduce(
  (prev, curr) => ({
    ...prev,
    [curr]: erichInformationWithPathType('pieceOfPath'),
  }),
  {},
);

export const START_CHAR = '@';
export const END_CHAR = 'x';
export const FORK_CHAR = '+';
const UP_DOWN_CHAR = '|';
const LEFT_RIGHT_CHAR = '-';
export const EMPTY_CHAR = ' ';

export const VALID_CHARS: Record<string, (info: LocationInformation) => PathInformation> = {
  ...ALPHABET,
  [FORK_CHAR]: erichInformationWithPathType('pieceOfPath'),
  [UP_DOWN_CHAR]: erichInformationWithPathType('pieceOfPath'),
  [LEFT_RIGHT_CHAR]: erichInformationWithPathType('pieceOfPath'),
  [START_CHAR]: erichInformationWithPathType('start'),
  [END_CHAR]: erichInformationWithPathType('end'),
  [EMPTY_CHAR]: erichInformationWithPathType('emptyPath'),
};

export const DIRECTION_INFORMATION: Record<Direction, Coordinates> = {
  [Direction.LEFT]: { y: 0, x: -1 },
  [Direction.RIGHT]: { y: 0, x: 1 },
  [Direction.UP]: { y: -1, x: 0 },
  [Direction.DOWN]: { y: 1, x: 0 },
};

export const DIRECTION_INFORMATION_ENTRIES = Object.entries(DIRECTION_INFORMATION);

export const DirectionOptions = {
  [Direction.UP]: UP_DOWN_CHAR,
  [Direction.DOWN]: UP_DOWN_CHAR,
  [Direction.LEFT]: LEFT_RIGHT_CHAR,
  [Direction.RIGHT]: LEFT_RIGHT_CHAR,
};

export const OppositeDirection = {
  [Direction.UP]: Direction.DOWN,
  [Direction.DOWN]: Direction.UP,
  [Direction.LEFT]: Direction.RIGHT,
  [Direction.RIGHT]: Direction.LEFT,
};

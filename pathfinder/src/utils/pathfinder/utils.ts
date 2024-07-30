import { ALPHABET, EMPTY_CHAR, END_CHAR, FORK_CHAR } from '@src/constants/pathfinder/data';
import { ErrorCode } from '@src/constants/pathfinder/enums';
import { ERRORS, ErrorWithStatusCode } from '@src/constants/pathfinder/errors';
import { Coordinates } from '@src/types';

export function calculateNewCoordinates(
  currentCoordinates: Coordinates,
  directionCoordinates: Coordinates,
): Coordinates {
  const newX = currentCoordinates.x + directionCoordinates.x;
  const newY = currentCoordinates.y + directionCoordinates.y;
  return { x: newX, y: newY };
}

export function checkIsFork(char: string) {
  return char === FORK_CHAR;
}

export function checkIsEnd(char: string) {
  return char === END_CHAR;
}

export function checkIsLetter(char: string) {
  return Boolean(ALPHABET[char]);
}

export function checkIsEmpty(char: string) {
  return char === EMPTY_CHAR;
}

export function throwError<
  TCode extends ErrorCode,
  TError extends (typeof ERRORS)[TCode],
  TErrorCodeParams extends TError extends string
    ? never[]
    : // @ts-ignore
      Parameters<TError>,
>(errorCode: TCode, ...args: TErrorCodeParams): never {
  const possibleMessage = ERRORS[errorCode];

  if (args && typeof possibleMessage !== 'string') {
    // @ts-ignore
    throw new ErrorWithStatusCode(possibleMessage(...args), errorCode);
  }

  throw new ErrorWithStatusCode(possibleMessage as string, errorCode);
}

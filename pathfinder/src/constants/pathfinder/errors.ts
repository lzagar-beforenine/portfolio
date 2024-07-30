import { END_CHAR, START_CHAR } from '@src/constants/pathfinder/data';
import { Coordinates, LocationInformation, NextCoordinates } from '@src/types';
import { ErrorCode } from './enums';

export class ErrorWithStatusCode extends Error {
  statusCode: ErrorCode;
  constructor(message: string, statusCode: ErrorCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const ERRORS = {
  [ErrorCode.NotValidCharacter]: (info: LocationInformation) =>
    `Character ${info.char} at location [${info.x}][${info.y}] is not valid character`,

  [ErrorCode.MultipleStarts]: (start1: LocationInformation, start2: LocationInformation) =>
    `There are multiple start characters (${start1.char}) at location [${start1.x}][${start1.y}] and [${start2.x}][${start2.y}]`,
  [ErrorCode.MissingStart]: `Map is missing start character (${START_CHAR})`,
  [ErrorCode.StartNotConnected]: (info: LocationInformation) =>
    `Start character (${info.char}) at location [${info.x}][${info.y}] is not connected to any path`,
  [ErrorCode.StartHasMultiplePaths]: (info: LocationInformation) =>
    `Start character (${info.char}) at location [${info.x}][${info.y}] has multiple paths connected to it`,

  [ErrorCode.MissingEnd]: `Map is missing end character (${END_CHAR})`,

  [ErrorCode.BrokenPath]: (info: NextCoordinates) => `Path is broken at location [${info.x}][${info.y}]`,
  [ErrorCode.PathOutOfBoundsOfMap]: (info: Coordinates) =>
    `Path is out of bounds of map at location [${info.x}][${info.y}]`,

  [ErrorCode.FakeTurn]: (info: NextCoordinates) => `Fake turn at location [${info.x}][${info.y}]`,
} satisfies Record<ErrorCode, ((...args: any) => string) | string>;

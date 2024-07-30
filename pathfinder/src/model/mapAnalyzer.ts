import { DIRECTION_INFORMATION_ENTRIES, DirectionOptions, VALID_CHARS } from '@src/constants/pathfinder/data';
import { Direction, ErrorCode } from '@src/constants/pathfinder/enums';
import { Coordinates, LocationInformation, NextCoordinates, PathInformation } from '@src/types';
import {
  calculateNewCoordinates,
  checkIsEnd,
  checkIsFork,
  checkIsLetter,
  throwError,
} from '@src/utils/pathfinder/utils';

abstract class MapAnalyzer {
  protected map: string[];
  constructor(map: string[]) {
    this.map = map;
  }

  private getPathInfo(info: LocationInformation): PathInformation {
    const enrich = VALID_CHARS[info.char];
    if (!enrich) {
      throwError(ErrorCode.NotValidCharacter, info);
    }
    return enrich(info);
  }

  private getStartPosition(): PathInformation {
    const pathInfo: {
      start?: PathInformation;
      end?: PathInformation;
    } = {};

    this.map.forEach((row, y) => {
      [...row].forEach((char, x) => {
        const data = { x, y, char };
        const enrichedData = this.getPathInfo(data);
        if (enrichedData.start) {
          if (pathInfo.start) {
            throwError(ErrorCode.MultipleStarts, enrichedData, pathInfo.start);
          }

          pathInfo.start = enrichedData;
        } else if (enrichedData.end) {
          pathInfo.end = enrichedData;
        }
      });
    });

    if (!pathInfo.start) {
      throwError(ErrorCode.MissingStart);
    }

    if (!pathInfo.end) {
      throwError(ErrorCode.MissingEnd);
    }

    return pathInfo.start;
  }

  protected checkIfCoordinatesAreInGrid(coordinates: Coordinates): boolean {
    const { x, y } = coordinates;

    return y >= 0 && y < this.map.length && x >= 0 && x < this.map[y].length;
  }

  protected getChar(coordinates: Coordinates): string {
    const { x, y } = coordinates;
    try {
      const char = this.map[y][x];
      if (!char) {
        throwError(ErrorCode.PathOutOfBoundsOfMap, coordinates);
      }

      return char;
    } catch (e) {
      throwError(ErrorCode.PathOutOfBoundsOfMap, coordinates);
    }
  }

  protected isPathConnected({ direction, ...coordinates }: NextCoordinates): boolean {
    if (!this.checkIfCoordinatesAreInGrid(coordinates)) {
      return false;
    }
    const char = this.getChar(coordinates);

    return DirectionOptions[direction] === char || checkIsLetter(char) || checkIsFork(char) || checkIsEnd(char);
  }

  private getStartInformation(start: LocationInformation): NextCoordinates {
    let startInformation: NextCoordinates | null = null;

    DIRECTION_INFORMATION_ENTRIES.forEach(([possibleDirection, directionCoordinates]) => {
      const possibleDirectionFormatted = Number(possibleDirection) as Direction;
      const newCoordinates = calculateNewCoordinates(start, directionCoordinates);

      if (this.isPathConnected({ ...newCoordinates, direction: possibleDirectionFormatted })) {
        if (startInformation) {
          throwError(ErrorCode.StartHasMultiplePaths, start);
        }
        startInformation = {
          ...newCoordinates,
          direction: possibleDirectionFormatted,
        };
      }
    });

    if (!startInformation) {
      throwError(ErrorCode.StartNotConnected, start);
    }

    return startInformation;
  }

  protected loadMap(): NextCoordinates {
    const start = this.getStartPosition();
    return this.getStartInformation(start);
  }
}

export default MapAnalyzer;

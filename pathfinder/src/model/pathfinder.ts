import { LocationInformation, MapData, NextCoordinates } from '@src/types';
import {
  DIRECTION_INFORMATION,
  DIRECTION_INFORMATION_ENTRIES,
  OppositeDirection,
  START_CHAR,
} from '@src/constants/pathfinder/data';
import { Direction, ErrorCode } from '@src/constants/pathfinder/enums';
import MapAnalyzer from '@src/model/mapAnalyzer';

import {
  calculateNewCoordinates,
  checkIsEmpty,
  checkIsEnd,
  checkIsFork,
  checkIsLetter,
  throwError,
} from '@src/utils/pathfinder/utils';

class Pathfinder extends MapAnalyzer {
  private data: MapData | null = null;
  private letters = '';
  private path = START_CHAR;
  private mapVisited: LocationInformation[][];

  constructor(map: string[]) {
    super(map);
    this.mapVisited = Array.from({ length: map.length }, (_, index) => Array(map[index].length));
  }

  private getTurnDirection(nextCoordinates: NextCoordinates): NextCoordinates {
    let nextInformation: NextCoordinates | null = null;

    DIRECTION_INFORMATION_ENTRIES.forEach(([possibleDirection, directionCoordinates]) => {
      const possibleDirectionFormatted = Number(possibleDirection) as Direction;
      if (OppositeDirection[Number(possibleDirection) as Direction] !== nextCoordinates.direction) {
        const newCoordinates = calculateNewCoordinates(nextCoordinates, directionCoordinates);

        if (this.isPathConnected({ ...newCoordinates, direction: possibleDirectionFormatted })) {
          if (possibleDirectionFormatted === nextCoordinates.direction || nextInformation) {
            throwError(ErrorCode.FakeTurn, nextCoordinates);
          }
          nextInformation = {
            ...newCoordinates,
            direction: possibleDirectionFormatted,
          };
        }
      }
    });

    if (!nextInformation) {
      throwError(ErrorCode.BrokenPath, nextCoordinates);
    }

    return nextInformation;
  }

  private getLetterDirection(nextCoordinates: NextCoordinates): NextCoordinates {
    const nextInformation: Record<number, NextCoordinates> = {};
    let numberOfPossibleDirections = 0;
    let newDirection = nextCoordinates.direction;

    DIRECTION_INFORMATION_ENTRIES.forEach(([possibleDirection, directionCoordinates]) => {
      const possibleDirectionFormatted = Number(possibleDirection) as Direction;
      if (OppositeDirection[possibleDirectionFormatted] !== nextCoordinates.direction) {
        const newCoordinates = calculateNewCoordinates(nextCoordinates, directionCoordinates);

        if (this.isPathConnected({ ...newCoordinates, direction: possibleDirectionFormatted })) {
          numberOfPossibleDirections += 1;
          newDirection = possibleDirectionFormatted;
          nextInformation[possibleDirectionFormatted] = {
            ...newCoordinates,
            direction: possibleDirectionFormatted,
          };
        }
      }
    });

    if (numberOfPossibleDirections === 0) {
      throwError(ErrorCode.BrokenPath, nextCoordinates);
    }

    if (numberOfPossibleDirections === 2) {
      throwError(ErrorCode.FakeTurn, nextCoordinates);
    }

    if (numberOfPossibleDirections === 1) {
      return nextInformation[newDirection];
    }

    return nextInformation[nextCoordinates.direction];
  }

  private traversePath(nextCoordinates: NextCoordinates) {
    if (!this.checkIfCoordinatesAreInGrid(nextCoordinates)) {
      throwError(ErrorCode.PathOutOfBoundsOfMap, nextCoordinates);
    }

    const char = this.getChar(nextCoordinates);

    if (checkIsEmpty(char)) {
      throwError(ErrorCode.BrokenPath, nextCoordinates);
    }
    this.path += char;
    if (checkIsEnd(char)) {
      return;
    }

    const coordinates = DIRECTION_INFORMATION[nextCoordinates.direction];
    const newCoordinates = calculateNewCoordinates(nextCoordinates, coordinates);
    let newCoordinatesWithDirection: NextCoordinates = {
      ...newCoordinates,
      direction: nextCoordinates.direction,
    };

    if (!this.mapVisited[nextCoordinates.y][nextCoordinates.x]) {
      if (checkIsLetter(char)) {
        this.letters += char;
        newCoordinatesWithDirection = this.getLetterDirection(nextCoordinates);
      } else if (checkIsFork(char)) {
        newCoordinatesWithDirection = this.getTurnDirection(nextCoordinates);
      }
    }
    this.mapVisited[nextCoordinates.y][nextCoordinates.x] = {
      ...newCoordinatesWithDirection,
      char,
    };
    return this.traversePath(newCoordinatesWithDirection);
  }

  getMap(): string[] {
    return this.map;
  }

  setNewMap(map: string[]): void {
    this.constructor(map);
  }

  getTraverseData(): MapData {
    if (!this.data) {
      const startInformation = this.loadMap();

      this.traversePath(startInformation);
      this.data = {
        path: this.path,
        letters: this.letters,
      };
    }

    return this.data;
  }
}

export default Pathfinder;

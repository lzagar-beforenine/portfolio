import { Direction } from './constants/enums';

export type PathData = {
  path: string;
  letters: string;
};

export type PathInformation = PathType & LocationInformation;

export type PathType = {
  start?: boolean;
  end?: boolean;
  pieceOfPath?: boolean;
  emptyPath?: boolean;
};

export type LocationInformation = {
  char: string;
} & Coordinates;

export type Coordinates = {
  x: number;
  y: number;
};

export type NextCoordinates = {
  x: number;
  y: number;
  direction: Direction;
};
export type MapData = { letters: string; path: string };

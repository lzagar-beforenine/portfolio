import Pathfinder from '@src/model/pathfinder';
import { Coordinates, NextCoordinates } from '@src/types';

type Basic = {
  input: string;
  name: string;
};

export type ValidIntegrationTestExample = {
  expectedOutput: {
    path: `@${string}x`;
    letters: string;
  };
} & Basic;

export type InvalidIntegrationTestExample = {
  error: {
    code: number;
    message: string;
  };
} & Basic;

export type PieceOfPathExample = {
  startCoordinates: Coordinates;

  validDirections: Record<number, NextCoordinates>;
  invalidDirections: Record<number, { errorCode: number; errorMessage: string }>;
} & Basic;

export type PieceOfPathInvalidExample = {
  startCoordinates: Coordinates;
  expectedOutput: { errorCode: number; errorMessage: string };
} & Basic;

export type UnitTestCases<TTestCase extends PieceOfPathExample | PieceOfPathInvalidExample> = {
  functionName: 'getLetterDirection' | 'getTurnDirection' | 'getStartPosition';
  testCases: TTestCase[];
};

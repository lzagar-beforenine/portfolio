import { Coordinates, LocationInformation, NextCoordinates, PathInformation } from '@src/types';

export type MapAnalyzerUnitTestCase<TInput, TOutput> = {
  name: string;
  input: TInput;
  validOutput?: TOutput;
  invalidOutput?: {
    errorCode: number;
    errorMessage: string;
  };
};

export type MapAnalyzerUnitTest<TInput, TOutput> = {
  map: string;
  functionName: 'getPathInfo' | 'checkIfCoordinatesAreInGrid' | 'getChar' | 'isPathConnected';
  testCases: MapAnalyzerUnitTestCase<TInput, TOutput>[];
};

export type MapAnalyzerGetStartPositionUnitTest = MapAnalyzerUnitTestCase<string, PathInformation>;
export type MapAnalyzerGetStartInformationUnitTest = MapAnalyzerUnitTestCase<
  {
    map: string;
    start: LocationInformation;
  },
  NextCoordinates
>;

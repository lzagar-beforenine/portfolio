import MapAnalyzer from '@src/classes/mapAnalyzer';
import { GET_PATH_INFO_INPUTS } from './data/pathInfoData';
import { convertToGrid } from '@tests/utils';
import { ErrorWithStatusCode } from '@src/constants/pathfinder/errors';
import { CHECK_IF_COORDINATES_ARE_IN_GRID } from './data/checkForCoordinatesData';
import { MapAnalyzerUnitTestCase } from './types';
import { CHAR_DATA } from './data/charData';
import { PATH_CONNECTED_DATA } from './data/pathConnectedData';
import { START_POSITION_DATA } from './data/startPositionData';
import { START_INFORMATION_DATA } from './data/startInformationData';

class MapAnalyzerExtended extends MapAnalyzer {}

describe('MapAnalyzer units test for ', () => {
  [GET_PATH_INFO_INPUTS, CHECK_IF_COORDINATES_ARE_IN_GRID, CHAR_DATA, PATH_CONNECTED_DATA].forEach(test => {
    test.testCases.forEach((testData: MapAnalyzerUnitTestCase<any, unknown>) => {
      it(`function ${test.functionName}() ${testData.name}`, () => {
        try {
          const data = new MapAnalyzerExtended(convertToGrid(test.map))[test.functionName](testData.input);
          expect(data).toEqual(testData.validOutput);
          if (testData.invalidOutput) {
            throw new Error('Expected an error but none was thrown');
          }
        } catch (error) {
          if (error instanceof ErrorWithStatusCode) {
            expect(error.message).toBe(testData.invalidOutput?.errorMessage);
            expect(error.statusCode).toBe(testData.invalidOutput?.errorCode);
          } else {
            throw error;
          }
        }
      });
    });
  });

  it.each(START_POSITION_DATA)('function getStartPosition() $name', testData => {
    try {
      const data = new MapAnalyzerExtended(convertToGrid(testData.input))['getStartPosition']();
      expect(data).toEqual(testData.validOutput);
      if (testData.invalidOutput) {
        throw new Error('Expected an error but none was thrown');
      }
    } catch (error) {
      if (error instanceof ErrorWithStatusCode) {
        expect(error.message).toBe(testData.invalidOutput?.errorMessage);
        expect(error.statusCode).toBe(testData.invalidOutput?.errorCode);
      } else {
        throw error;
      }
    }
  });

  it.each(START_INFORMATION_DATA)('function getStartInformation() $name', testData => {
    try {
      const data = new MapAnalyzerExtended(convertToGrid(testData.input.map))['getStartInformation'](
        testData.input.start,
      );
      expect(data).toEqual(testData.validOutput);
      if (testData.invalidOutput) {
        throw new Error('Expected an error but none was thrown');
      }
    } catch (error) {
      if (error instanceof ErrorWithStatusCode) {
        expect(error.message).toBe(testData.invalidOutput?.errorMessage);
        expect(error.statusCode).toBe(testData.invalidOutput?.errorCode);
      } else {
        throw error;
      }
    }
  });
});

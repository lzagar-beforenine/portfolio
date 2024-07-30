import Pathfinder from '@src/model/pathfinder';
import { ErrorWithStatusCode } from '@src/constants/pathfinder/errors';
import { INVALID_INPUTS } from '@tests/pathfinder/data/invalidIntegrationData';
import { VALID_INTEGRATION_INPUTS } from '@tests/pathfinder/data/validIntegrationData';
import { DIRECTION_INFORMATION_ENTRIES } from '@src/constants/pathfinder/data';
import { INVALID_TURN_INPUTS, TURN_INPUTS } from './data/turnDirectionTestData';
import { INVALID_LETTER_INPUTS, LETTER_INPUTS } from './data/letterDirectionData';
import { convertToGrid } from '@tests/utils';

describe('Pathfinder integration tests', () => {
  it.each(VALID_INTEGRATION_INPUTS)('should find end $name', testData => {
    const data = new Pathfinder(convertToGrid(testData.input)).getTraverseData();
    expect(data.letters).toBe(testData.expectedOutput.letters);
    expect(data.path).toBe(testData.expectedOutput.path);
  });

  it.each(INVALID_INPUTS)('should throw exception for $name', testData => {
    try {
      new Pathfinder(convertToGrid(testData.input)).getTraverseData();
      throw new Error('Expected an error but none was thrown');
    } catch (error) {
      if (error instanceof ErrorWithStatusCode) {
        expect(error.message).toBe(testData.error.message);
        expect(error.statusCode).toBe(testData.error.code);
      } else {
        throw error;
      }
    }
  });
});

describe('Pathfinder units test for', () => {
  [TURN_INPUTS, LETTER_INPUTS].forEach(tests => {
    tests.testCases.forEach(testData => {
      it(`function ${tests.functionName}() should ${testData.name}`, () => {
        const pathFinder = new Pathfinder(convertToGrid(testData.input));
        DIRECTION_INFORMATION_ENTRIES.forEach(([direction]) => {
          const directionFormatted = Number(direction);
          try {
            const data = pathFinder[tests.functionName]({
              ...testData.startCoordinates,
              direction: directionFormatted,
            });
            expect(data).toEqual(testData.validDirections[directionFormatted]);
          } catch (error) {
            if (error instanceof ErrorWithStatusCode) {
              expect(error.message).toBe(testData.invalidDirections[directionFormatted]?.errorMessage);
              expect(error.statusCode).toBe(testData.invalidDirections[directionFormatted]?.errorCode);
            } else {
              throw error;
            }
          }
        });
      });
    });
  });

  [INVALID_TURN_INPUTS, INVALID_LETTER_INPUTS].forEach(tests => {
    tests.testCases.forEach(testData => {
      it(`function ${tests.functionName}() should ${testData.name}`, () => {
        const pathFinder = new Pathfinder(convertToGrid(testData.input));
        DIRECTION_INFORMATION_ENTRIES.forEach(([direction]) => {
          const directionFormatted = Number(direction);
          try {
            pathFinder['getTurnDirection']({
              ...testData.startCoordinates,
              direction: directionFormatted,
            });
            throw new Error('Expected an error but none was thrown');
          } catch (error) {
            if (error instanceof ErrorWithStatusCode) {
              expect(error.message).toBe(testData.expectedOutput.errorMessage);
              expect(error.statusCode).toBe(testData.expectedOutput.errorCode);
            } else {
              throw error;
            }
          }
        });
      });
    });
  });
});

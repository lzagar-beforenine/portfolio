export const VALID_MAP = `
@---A---+
        |
x-B-+   C
    |   |
    +---+
`;

export const VALID_MAP_WITH_INTERSECTION = `
@
| +-C--+
A |    |
+---B--+
  |      x
  |      |
  +---D--+
`;

export const MAP_MISSING_START_CHAR = `
---A---+
        |
x-B-+   C
    |   |
    +---+
`;

export const MAP_HAS_MULTIPLE_START_CHAR = `
 @---A---+
         |
x-@B-+   C
     |   |
     +---+
`;

export const MAP_MISSING_END_CHAR = `
 @---A---+
         |
  -B-+   C
     |   |
     +---+
`;

export const MULTIPLE_PATHS_CONNECTED_TO_START_MAP = `
@---A---+
|       |
x-B-+   C
    |   |
    +---+
`;

export const START_NOT_CONNECTED_TO_PATH_MAP = `
@ --A---+
        |
x-B-+   C
    |   |
    +---+
`;

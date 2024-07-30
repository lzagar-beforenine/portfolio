export const NON_VALID_CHARACTER_INPUT = `
1 @---A---+
1         |
1 x-B-+   C
1     |   |
1     +---+
`;

export const MISSING_START_CHARACTER_INPUT = `
   -A---+
        |
x-B-+   C
    |   |
    +---+ 
`;

export const MISSING_END_CHARACTER_INPUT = `
@--A---+
       |
 B-+   C
   |   |
   +---+ 
`;

export const MULTIPLE_START_CHARACTERS_INPUT = `
 @--A-@-+
        |
x-B-+   C
    |   |
    +---+
`;

export const MULTIPLE_DIRECTIONS_LETTER_INPUT = `
    |   
@---A---+
        |
        |
x-B-+   |
    |   |
    +---C
`;

export const MULTIPLE_STARTING_PATHS_INPUT = `
@--A---+
|      |
   x   C
   |   |
   +---+ 
`;

export const START_CHAR_NOT_CONNECTED_INPUT = `
     A-B
       |
@ -A---+
       |
  x+   C
   |   |
   +---+
`;

export const PATH_BROKEN_INPUT = `
@-A--+
      
     +-B--x-C--D
`;

export const FORK_NOT_VALID_INPUT = `
@--A-+
     |
      
     B-x
`;

export const FAKE_TURN_INPUT = `
@-A-+-B-x
`;

export const PATH_OUTSIDE_BOUNDS_INPUT = `
@-A--
    |
x---+
`;

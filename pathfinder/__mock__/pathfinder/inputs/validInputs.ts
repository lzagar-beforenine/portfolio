export const BASIC_INPUT = `
  @---A---+
          |
  x-B-+   C
      |   |
      +---+
`;

export const LETTER_TURN_INPUT = `
  @---A---+
          |
  x-B-+   |
      |   |
      +---C
`;

export const INTERSECTION_INPUT = `
  @
  | +-C--+
  A |    |
  +---B--+
    |      x
    |      |
    +---D--+
`;

export const LETTER_INTERSECTION_INPUT = `
     +-O-N-+
     |     |
     |   +-I-+
 @-G-O-+ | | |
     | | +-+ E
     +-+     S
             |
             x
`;

export const COMPACT_SPACE_INPUT = `
 +-L-+
 |  +A-+
@B+ ++ H
 ++    x
`;

export const IGNORE_STUFF_AFTER_END_INPUT = `
  @-A--+
       |
       +-B--x-C--D
`;

export const MULTIPLE_EXITS_INPUT = `
@-A-x-x
`;

export const IGNORE_INVALID_PATH_AFTER_END_INPUT = `
@-A-x-+|
    |
`;

export const IGNORE_DISCONNECTED_PATHS_INPUT = `
|-+x-AV-D

@-A-x
    
 ----x--|+
`;

export const SHORT_PATH_INPUT = `
@x
`;

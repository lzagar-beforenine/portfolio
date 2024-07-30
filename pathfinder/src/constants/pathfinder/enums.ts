export enum ErrorCode {
  NotValidCharacter = 1,

  MultipleStarts = 2,
  MissingStart = 3,
  StartNotConnected = 4,
  StartHasMultiplePaths = 5,

  MissingEnd = 7,

  BrokenPath = 8,
  PathOutOfBoundsOfMap = 9,

  FakeTurn = 10,
}

export enum Direction {
  UP = 1,
  DOWN = 2,
  LEFT = 3,
  RIGHT = 4,
}

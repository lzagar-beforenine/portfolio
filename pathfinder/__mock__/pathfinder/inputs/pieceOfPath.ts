export const DOWN_INPUT = (char: 'A' | '+') => `
 
 ${char} 
 | 
`;

export const UP_INPUT = (char: 'A' | '+') => `
 |
 ${char}
     
`;

export const LEFT_INPUT = (char: 'A' | '+') => `
  
-${char}
  
`;

export const RIGHT_INPUT = (char: 'A' | '+') => ` 
  
 ${char}-
  
`;

export const UP_DOWN_INPUT = (char: 'A' | '+') => `
 |
 ${char} 
 | 
`;

export const RIGHT_LEFT_INPUT = (char: 'A' | '+') => `
  
-${char}-
  
`;

export const MULTIPLE_PATHS_MISSING_DOWN_PATH_INPUT = (char: 'A' | '+') => `
 |
-${char}-
  
`;

export const MULTIPLE_PATHS_MISSING_UP_PATH_INPUT = (char: 'A' | '+') => `
  
-${char}-
 |
`;

export const MULTIPLE_PATHS_MISSING_RIGHT_PATH_INPUT = (char: 'A' | '+') => `
 |
-${char}
 |
`;

export const MULTIPLE_PATHS_MISSING_LEFT_PATH_INPUT = (char: 'A' | '+') => `
 | 
 ${char}-
 |
`;

export const MULTIPLE_PATHS_INPUT = (char: 'A' | '+') => `
 | 
-${char}-
 |
`;

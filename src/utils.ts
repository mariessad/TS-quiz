// imported to API.ts

export const shuffleArray = (array: any[]) =>
  // spread array to creat new array & 'randomly' sort
  [...array].sort(() => Math.random() - 0.5);

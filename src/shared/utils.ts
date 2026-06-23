export const getRandomNumber = (min: number, max: number) => {
  if (min < 0 || min > max) {
    return 'error';
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
};

// magic numbers
const AMOUNT_NUMBERS = 2;
const AMOUNT_TIME = 60;
const MILLISECONDS = 1000;
const AMOUNT_IN_TIME = 3600;

export const getRandomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const formatTime = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / MILLISECONDS);
  const hours = Math.floor(totalSeconds / AMOUNT_IN_TIME);
  const minutes = Math.floor((totalSeconds % AMOUNT_IN_TIME) / AMOUNT_TIME);
  const seconds = totalSeconds % AMOUNT_TIME;

  const formattedTime = `${hours.toString().padStart(AMOUNT_NUMBERS, '0')}:${minutes
    .toString()
    .padStart(AMOUNT_NUMBERS, '0')}:${seconds.toString().padStart(AMOUNT_NUMBERS, '0')}`;
  return formattedTime;
};

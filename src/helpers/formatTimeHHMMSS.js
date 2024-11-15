export const formatTimeHHMMSS = (timeInSeconds) => {
  console.log(timeInSeconds);
  if(Number.isNaN(Math.floor(timeInSeconds))) return '00:00';
  const time = Math.floor(timeInSeconds);
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  const formattedHours = hours > 0 ? `${hours}:` : '';
  const formattedMinutes = minutes < 10 ? `0${minutes}:` : `${minutes}:`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
};
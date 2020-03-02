export const hourComplete = timestamp => {
  var hours = Math.floor(timestamp / 60 / 60);
  var minutes = Math.floor(timestamp / 60) - hours * 60;
  var seconds = timestamp % 60;
  let time = '0';

  if (hours > 0 && hours < 10) {
    time = `0${hours}:00:00`;
  } else if (hours > 9) {
    time = `${hours}:${minutes}:00`;
  }

  if (minutes > 0 && minutes < 10) {
    time = `${hours}:0${minutes}:00`;
  } else if (minutes > 9) {
    time = `${hours}:${minutes}:00`;
  }

  if (seconds > 0 && seconds < 10) {
    let secondsWithoutMiliseconds = `${seconds}`.slice(0, 1);
    time = `${hours}:${minutes}:0${secondsWithoutMiliseconds}`;
  } else if (seconds > 9) {
    let secondsWithoutMiliseconds = `${seconds}`.slice(0, 2);
    time = `${hours}:${minutes}:${secondsWithoutMiliseconds}`;
  }
  return time;
};

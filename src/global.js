import {Dimensions} from 'react-native';

export const SCREEN = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
};

export const WINDOW = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export const getFirstLetters = (inputString: any) => {
  const words = inputString.trim().split(' ');
  if (words.length === 0) {
    return ''; // Chuỗi rỗng
  } else if (words.length === 1) {
    const firstLetter = words[0].charAt(0).toUpperCase(); // Lấy chữ cái đầu tiên của từ đầu tiên và chuyển thành chữ hoa
    return firstLetter + firstLetter; // Lặp lại chữ cái đầu tiên 2 lần
  } else {
    const firstLetter = words[0].charAt(0).toUpperCase(); // Lấy chữ cái đầu tiên của từ đầu tiên và chuyển thành chữ hoa
    const lastLetter = words[words.length - 1].charAt(0).toUpperCase(); // Lấy chữ cái đầu tiên của từ cuối cùng và chuyển thành chữ hoa
    return firstLetter + lastLetter; // Kết hợp chữ cái đầu tiên của từ đầu tiên và từ cuối cùng
  }
};

export const parseMsToSeconds = ms => {
  const milliseconds = parseInt(ms);

  const seconds = Math.floor(milliseconds / 1000);

  return seconds;
};

/**
 *
 * @param {*} seconds - type number: số giây
 * @returns kiểu thời gian: 'hh:mm:ss'
 */
export const parseSecondsToTime = seconds => {
  const hh = Math.floor(seconds / 60 / 60)
    .toString()
    .padStart(2, '0');
  const mm = Math.floor((seconds / 60) % 60)
    .toString()
    .padStart(2, '0');
  const ss = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');

  return `${hh}:${mm}:${ss}`;
};

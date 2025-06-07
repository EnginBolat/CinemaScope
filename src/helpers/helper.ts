import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const DESIGN_WIDTH = 375;
const DESIGN_HEIGHT = 902;

export const scaleWidth = (size: number): number => {
  const scale = SCREEN_WIDTH / DESIGN_WIDTH;
  return PixelRatio.roundToNearestPixel(size * scale);
};

export const scaleHeight = (size: number): number => {
  const scale = SCREEN_HEIGHT / DESIGN_HEIGHT;
  return PixelRatio.roundToNearestPixel(size * scale);
};

export const scale = (size: number): number => {
  const scaleFactor = Math.min(SCREEN_WIDTH / DESIGN_WIDTH, SCREEN_HEIGHT / DESIGN_HEIGHT);
  return PixelRatio.roundToNearestPixel(size * scaleFactor);
};

type ISetListForUpdateStateAndStorage = {
  isDataAlreadyExist: boolean;
  array: string[];
};
/**
 * Controls value already in array, if it's already exist; the data is removed
 * otherwise its updated the whole array
 * @param newData array
 * @param mainArray array of strings
 * @returns Array of string
 */
export const setListForUpdateStateAndStorage = (
  newData: string,
  mainArray: string[],
): ISetListForUpdateStateAndStorage => {
  const isDataExistInMainArray = mainArray.includes(newData);
  const newUpdatedArray = isDataExistInMainArray
    ? mainArray.filter(itemId => itemId !== newData)
    : [...mainArray, newData];
  return {
    isDataAlreadyExist: isDataExistInMainArray,
    array: newUpdatedArray,
  };
};

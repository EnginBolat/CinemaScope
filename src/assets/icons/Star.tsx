import Svg, { Path } from 'react-native-svg';
import { IconProps } from './IconProps';

export const Star = ({ width, height, color }: IconProps) => (
  <Svg width={width ?? '24'} height={height ?? '24'} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 8.89L12.94 12H15.76L13.49 13.62L14.42 16.63L12 14.79L9.58 16.63L10.51 13.62L8.24 12H11.06L12 8.89ZM12 2L9.58 10H2L8.17 14.41L5.83 22L12 17.31L18.18 22L15.83 14.41L22 10H14.42L12 2Z"
      fill={color ?? "white"}
    />
  </Svg>
);

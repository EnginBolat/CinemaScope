import Svg, { Path } from 'react-native-svg';
import { IconProps } from './IconProps';

const ChevronLeft = ({ size, color }: IconProps) => (
  <Svg width={size ?? '24'} height={size ?? '24'} viewBox="0 0 24 24" fill="none">
    <Path d="M15.705 7.41L14.295 6L8.29504 12L14.295 18L15.705 16.59L11.125 12L15.705 7.41Z" fill={color ?? 'black'} />
  </Svg>
);

export default ChevronLeft;

import Svg, { Path } from 'react-native-svg';
import { IconProps } from './IconProps';

const HomeIcon = ({ height, width, color }: IconProps) => (
  <Svg width={width ?? '28'} height={height ?? '24'} viewBox="0 0 28 24" fill="none">
    <Path
      id="Vector"
      d="M14 4.25335L20.6667 10.2534V20.6667H18V12.6667H10V20.6667H7.33333V10.2534L14 4.25335ZM14 0.666687L0.666664 12.6667H4.66666V23.3334H12.6667V15.3334H15.3333V23.3334H23.3333V12.6667H27.3333L14 0.666687Z"
      fill={color ?? 'white'}
    />
  </Svg>
);

export default HomeIcon;

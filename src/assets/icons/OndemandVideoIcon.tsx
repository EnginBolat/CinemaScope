import Svg, { Path } from 'react-native-svg';
import { IconProps } from './IconProps';

const OndemandVideoIcon = ({ width, height, color }: IconProps) => (
  <Svg width={width ?? '32'} height={height ?? '32'} viewBox="0 0 32 32" fill="none">
    <Path
      d="M12 9.33333V20L21.3333 14.6667L12 9.33333ZM28 4H4.00001C2.53334 4 1.33334 5.2 1.33334 6.66667V22.6667C1.33334 24.1333 2.53334 25.3333 4.00001 25.3333H10.6667V28H21.3333V25.3333H28C29.4667 25.3333 30.6667 24.1333 30.6667 22.6667V6.66667C30.6667 5.2 29.4667 4 28 4ZM28 22.6667H4.00001V6.66667H28V22.6667Z"
      fill={color ?? 'white'}
    />
  </Svg>
);

export default OndemandVideoIcon;

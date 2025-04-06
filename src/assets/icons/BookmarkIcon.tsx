import Svg, { Path } from 'react-native-svg';
import { IconProps } from './IconProps';

const Bookmark = ({ width, height, color }: IconProps) => (
  <Svg width={width ?? '32'} height={height ?? '32'} viewBox="0 0 32 32" fill="none">
    <Path
      d="M22.6667 4H9.33334C7.86667 4 6.66667 5.2 6.66667 6.66667V28L16 24L25.3333 28V6.66667C25.3333 5.2 24.1333 4 22.6667 4ZM22.6667 24L16 21.0933L9.33334 24V6.66667H22.6667V24Z"
      fill={color ?? 'white'}
    />
  </Svg>
);

export default Bookmark;

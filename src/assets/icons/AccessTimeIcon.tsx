import Svg, { Path } from 'react-native-svg';
import { IconProps } from './IconProps';

const AccessTimeIcon = ({ width, height, color }: IconProps) => (
  <Svg width={width ?? '32'} height={height ?? '32'} viewBox="0 0 32 32" fill="none">
    <Path
      d="M15.9867 2.66669C8.62667 2.66669 2.66667 8.64002 2.66667 16C2.66667 23.36 8.62667 29.3334 15.9867 29.3334C23.36 29.3334 29.3333 23.36 29.3333 16C29.3333 8.64002 23.36 2.66669 15.9867 2.66669ZM16 26.6667C10.1067 26.6667 5.33334 21.8934 5.33334 16C5.33334 10.1067 10.1067 5.33335 16 5.33335C21.8933 5.33335 26.6667 10.1067 26.6667 16C26.6667 21.8934 21.8933 26.6667 16 26.6667ZM16.6667 9.33335H14.6667V17.3334L21.6667 21.5334L22.6667 19.8934L16.6667 16.3334V9.33335Z"
      fill={color ?? 'white'}
    />
  </Svg>
);

export default AccessTimeIcon;

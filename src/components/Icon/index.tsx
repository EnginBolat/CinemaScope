import { FC } from 'react';
import { IIconProps } from './typs';
import Icons from '@assets/icons';

const Icon: FC<IIconProps> = ({ name, size, height, width, color, color2 }) => {
  const SelectedIcon = Icons[name];
  return <SelectedIcon size={size} height={height} width={width} color={color} color2={color2} />;
};

export default Icon;

import React from 'react';
import { Image, View } from 'react-native';
import { IHeaderProps } from './types';
import Images from '@assets/images';
import { scaleHeight, scaleWidth } from '@helpers/helper';
import Text from '@components/Text';
import { styles } from './styles';

const Header = (props: IHeaderProps) => {
  const {
    isHaveHeader = true,
    title,
    titleType = 'boldHeading620',
    leftIconName,
    leftIconOnPress,
    rightIconName,
    rightIconOnPress,
  } = props;
  return (
    <View style={styles.container}>
      {title && !isHaveHeader && <Text type={titleType} text={title} style={styles.titleColor} />}
      {isHaveHeader && !title && (
        <Image
          source={Images.logo}
          resizeMethod="resize"
          resizeMode="contain"
          height={scaleHeight(64)}
          width={scaleWidth(64)}
          style={styles.image}
        />
      )}
    </View>
  );
};

export default React.memo(Header);

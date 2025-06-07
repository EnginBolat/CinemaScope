import React, { FC } from 'react';
import { Pressable, StyleProp, StyleSheet, View } from 'react-native';

import { Star } from '@assets/icons/Star';
import Text from '@components/Text';
import { BASE_W500_URL } from '@constants/AppConfig';
import { scale } from '@helpers/helper';
import FastImage from '@d11/react-native-fast-image';

import { styles } from './style';
import { IMovileCardProps } from './type';
import { ImageStyle } from '@d11/react-native-fast-image/src';

const MovieCard: FC<IMovileCardProps> = props => {
  const { item, onPress, imageStyle, containerStyle } = props;

  const composedImageStyle: StyleProp<ImageStyle> = StyleSheet.compose(styles.image, imageStyle);
  const composedContainerStyle = StyleSheet.compose(styles.container, containerStyle);

  return (
    <Pressable onPress={() => onPress(item)} style={composedContainerStyle}>
      <FastImage
        source={{ uri: BASE_W500_URL + item.poster_path, priority: FastImage.priority.high }}
        style={composedImageStyle}
      />
      <Text text={item.title} type="mediumCaption14" numberOfLines={1} style={styles.title} />
      <View style={styles.textContainer}>
        <Star height={scale(18)} width={scale(18)} />
        <Text text={item.vote_average.toString().substring(0, 3)} type="mediumCaption14" numberOfLines={2} />
      </View>
    </Pressable>
  );
};

export default React.memo(MovieCard);

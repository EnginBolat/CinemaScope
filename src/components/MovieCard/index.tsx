import React, { FC } from 'react';
import { Image, Pressable, View } from 'react-native';

import { Star } from '@assets/icons/Star';
import Text from '@components/Text';
import { BASE_W500_URL } from '@constants/AppConfig';
import { scale } from '@helpers/helper';

import { styles } from './style';
import { IMovileCardProps } from './type';

const MovieCard: FC<IMovileCardProps> = ({ item, onPress }) => (
  <Pressable onPress={() => onPress(item)} style={styles.container}>
    <Image source={{ uri: BASE_W500_URL + item.poster_path }} style={styles.image} />
    <Text text={item.title} type="mediumCaption14" numberOfLines={1} style={styles.title} />
    <View style={styles.textContainer}>
      <Star height={scale(18)} width={scale(18)} />
      <Text text={item.vote_average.toString().substring(0, 3)} type="mediumCaption14" numberOfLines={2} />
    </View>
  </Pressable>
);

export default React.memo(MovieCard);

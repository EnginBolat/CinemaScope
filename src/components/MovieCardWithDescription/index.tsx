import React from 'react';
import { Pressable, View } from 'react-native';

import FastImage from '@d11/react-native-fast-image';
import { BASE_W500_URL } from '@constants/AppConfig.ts';
import { scale } from '@helpers/helper.ts';
import Text from '@components/Text';
import { Star } from '@assets/icons/Star.tsx';

import { Props } from './type';
import { styles } from './style';

const MovieCardWithDescription = ({ item, onPress }: Props) => (
  <Pressable style={styles.container} onPress={onPress}>
    <FastImage
      source={{ uri: BASE_W500_URL + item.poster_path, priority: FastImage.priority.high }}
      style={styles.image}
    />
    <View style={styles.textContainer}>
      <View style={styles.titleRow}>
        <Text
          text={item.title}
          type="mediumBody16"
          numberOfLines={1}
        />
        <View style={styles.ratingWithIconRow}>
          <Star height={scale(18)} width={scale(18)} />
          <Text text={item.vote_average.toString().substring(0, 3)} type="mediumCaption14" numberOfLines={2} />
        </View>
      </View>
      <Text text={item.overview} type="mediumCaption14" numberOfLines={6} />
    </View>
  </Pressable>
);

export default MovieCardWithDescription;

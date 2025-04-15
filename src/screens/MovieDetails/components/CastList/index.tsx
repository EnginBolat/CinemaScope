import Images from '@assets/images';
import { AppColors } from '@constants/AppColors';
import { BASE_W500_URL } from '@constants/AppConfig';
import FastImage from '@d11/react-native-fast-image';
import { Cast } from '@models/Cast';
import { View, FlatList } from 'react-native';

import { styles } from '../../style';
import { Text } from '@components/index';

type Props = {
  cast: Cast[] | undefined;
};

const CastList = ({ cast }: Props) => {
  const renderItem = ({ item }: { item: Cast }) => {
    const imageSource = item.profile_path
      ? { uri: BASE_W500_URL + item.profile_path, priority: FastImage.priority.low }
      : Images.profile;

    return (
      <View style={styles.castItemContainer}>
        <FastImage style={styles.smallImage} source={imageSource} resizeMode="cover" />
        <Text text={item?.name} />
        <Text text={`as ${item?.character}`} color={AppColors.white50} />
      </View>
    );
  };

  return (
    <>
      <View style={styles.castListContainer}>
        <Text type="mediumCaption14" text="Cast" />
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        bounces={false}
        horizontal
        data={cast}
        contentContainerStyle={styles.horizontalListContentContainer}
        renderItem={renderItem}
      />
    </>
  );
};

export default CastList;

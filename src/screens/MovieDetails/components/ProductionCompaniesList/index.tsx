import FastImage from '@d11/react-native-fast-image';
import { ProductionCompany } from '@models/ProductionCompany';

import { FlatList, View } from 'react-native';
import { Text } from '@components/index';
import { BASE_W500_URL } from '@constants/AppConfig';

import { styles } from '../../style';

type Props = {
  companies: ProductionCompany[] | undefined;
};

const ProductionCompaniesList = ({ companies }: Props) => {
  const renderItemProducatioCompanies = ({ item }: { item: ProductionCompany }) => (
    <FastImage
      style={styles.smallImage}
      source={{
        uri: BASE_W500_URL + item.logo_path,
        priority: FastImage.priority.low,
      }}
      resizeMode="contain"
    />
  );

  return (
    <>
      <View style={styles.castListContainer}>
        <Text type="mediumCaption14" text="Production Companies" />
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        bounces={false}
        horizontal={true}
        data={companies}
        contentContainerStyle={styles.horizontalListContentContainer}
        renderItem={renderItemProducatioCompanies}
      />
    </>
  );
};

export default ProductionCompaniesList;

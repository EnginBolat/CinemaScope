import { Text } from '@components/index';
import { View } from 'react-native';

import { styles } from '../../style';

type Props = {
  overview: string;
};

const Overview = ({ overview }: Props) => (
  <View style={styles.phStatic}>
    <Text type="regularCaption14" text={overview} />
  </View>
);

export default Overview;

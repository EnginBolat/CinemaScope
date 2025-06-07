import { View } from 'react-native';
import { Text } from '@components/index.ts';

import { Props } from './type.ts';
import { styles } from './styles.ts';

const EmptyList = ({ title }: Props) => (
  <View style={styles.container}>
    <Text text={`Nothing Found About ${title}`} type="boldHeading620" style={styles.text} />
  </View>
);

export default EmptyList;

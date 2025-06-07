import { Button, Icon, Text } from '@components/index';
import { AppColors } from '@constants/AppColors';
import { translate } from '@core/index';
import { FC } from 'react';
import { View } from 'react-native';
import { styles } from '../../style';

type IWatchListBottomSheetBody = {
  onPress: () => void;
};

const WatchListBottomSheetBody: FC<IWatchListBottomSheetBody> = ({ onPress }) => (
  <View style={styles.bottomSheetBodyContainer}>
    <Icon name="AccessTimeIcon" color={AppColors.primary} />
    <Text text={translate('app.details.addedWatchLater')} color="black" type="mediumBody16" />
    <Button onPress={onPress} text={translate('app.common.ok')} />
  </View>
);

export default WatchListBottomSheetBody;

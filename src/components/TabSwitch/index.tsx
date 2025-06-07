import Text from '@components/Text';
import { FC, useState } from 'react';
import { LayoutChangeEvent, Pressable, View } from 'react-native';
import { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { IDimensions, ITabSwitch } from '@components/TabSwitch/types.ts';
import styles from './styles';
import { AppColors } from '@constants/AppColors.ts';

const TabSwitch: FC<ITabSwitch> = ({ buttons, selectedTab, setSelectedTab }) => {
  const [dimensions, setDimensions] = useState<IDimensions>({ height: 20, width: 100 });
  const tabPositionX = useSharedValue(0);

  const buttonWidth = dimensions.width / buttons.length;

  const onTabBarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  };

  const handlePress = (index: number) => setSelectedTab(index);

  const onTabPress = (index: number) =>
    (tabPositionX.value = withTiming(buttonWidth * index, {}, () => runOnJS(handlePress)(index)));

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[animatedStyle, styles.selectionContainer, { height: dimensions.height - 10, width: buttonWidth - 10 }]}
      />
      <View style={styles.textContainer} onLayout={onTabBarLayout}>
        {buttons.map((button, index) => {
          const disabledColor = index !== selectedTab ? AppColors.white50 : AppColors.white;
          const isButtonDisabled = index === selectedTab;
          return (
            <Pressable
              key={index}
              style={styles.titleContainer}
              onPress={() => onTabPress(index)}
              disabled={index === selectedTab}>
              <Text style={[styles.title, { color: disabledColor }]} text={button.title} disabled={isButtonDisabled} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default TabSwitch;

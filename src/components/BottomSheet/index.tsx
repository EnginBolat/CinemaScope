import GorhomBottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetProps } from './type';
import { AppColors } from '@constants/AppColors';

const BottomSheet = forwardRef<GorhomBottomSheet, BottomSheetProps>((props, ref) => {
  const {
    children,
    onClose,
    contentContainerStyle,
    containerStyle,
    height,
    enableDynamicSizing = true,
    enablePanDownToClose = true,
    timeout,
  } = props;
  const insets = useSafeAreaInsets();
  const [sheetIndex, setSheetIndex] = useState<number>(-1);

  const handleSheetChanges = useCallback((index: number) => {
    setSheetIndex(index);
  }, []);

  const onChange = (index: number) => {
    handleSheetChanges(index);
    if (index === -1 && onClose) onClose();
  };

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      style={{ backgroundColor: AppColors.sheetBackground }}
    />
  );

  useEffect(() => {
    if (!(timeout && sheetIndex !== -1)) return;

    let currentSecond = timeout;
    const countdown = setInterval(() => {
      console.log('çalıştı');
      if (currentSecond <= 0) {
        clearInterval(countdown);
      }

      currentSecond--;
      if (currentSecond === 0 && onClose) {
        setSheetIndex(-1);
        onClose?.();
      }
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, [timeout, sheetIndex]);

  return (
    <GorhomBottomSheet
      index={sheetIndex}
      ref={ref}
      onChange={onChange}
      snapPoints={height}
      backdropComponent={renderBackdrop}
      enableBlurKeyboardOnGesture
      enablePanDownToClose={enablePanDownToClose}
      enableDynamicSizing={enableDynamicSizing}
      onClose={onClose}
      containerStyle={[containerStyle]}>
      <BottomSheetView style={[contentContainerStyle, { paddingBottom: insets.bottom, paddingHorizontal: 20 }]}>
        {children}
      </BottomSheetView>
    </GorhomBottomSheet>
  );
});

export default BottomSheet;

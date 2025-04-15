import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigationStack from '@stacks/MainNavigationStack';
import { store } from '@store/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';

const App = () => (
  <GestureHandlerRootView>
    <Provider store={store}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          <MainNavigationStack />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </Provider>
  </GestureHandlerRootView>
);

export default App;

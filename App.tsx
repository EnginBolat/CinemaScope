import { NavigationContainer } from '@react-navigation/native';
import MainNavigationStack from '@stacks/MainNavigationStack';
import { store } from '@store/store';
import { Provider } from 'react-redux';

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <MainNavigationStack />
    </NavigationContainer>
  </Provider>
);

export default App;

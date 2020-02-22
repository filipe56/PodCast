import { createSwitchNavigator } from 'react-navigation';

import HomeInNavigator from './HomeInNavigator';

export const getRootNavigator = () =>
  createSwitchNavigator(
    {
      home: {
        screen: HomeInNavigator,
      },
    },
    {
      initialRouteName: 'home',
    }
  );

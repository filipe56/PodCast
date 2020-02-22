import { createStackNavigator } from 'react-navigation';
import Player from '../screens/Player';
import ListPodCast from '../screens/ListPodCast';
import ListSound from '../screens/ListSound';

const HomeInNavigator = createStackNavigator({
  ListPodCast: {
    screen: ListPodCast,
  },
  ListSound: {
    screen: ListSound,
  },
  Player: {
    screen: Player,
  },
});

export default HomeInNavigator;

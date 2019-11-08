import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainScreen from './pages/main';
import SignInScreen from './pages/App';
import CadastrarScreen from './pages/cadastrar';

const AuthStack = createStackNavigator({
  Sign: { screen: SignInScreen },
});

const CadastroStack = createStackNavigator({
  Cadastrar: {
    screen: CadastrarScreen,
  },
});

const MainNavigator = createBottomTabNavigator(
  {
    Main: {
      screen: MainScreen,
    },
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      inactiveBackgroundColor: '#B727FF',
      activeBackgroundColor: '#9900e6',
      style: {
        width: '100%',
        height: 50,
      }
    }
  }
)


export default createAppContainer(

  createStackNavigator(
    {
      MainNavigator,
      AuthStack,
      CadastroStack,
    },
    {
      initialRouteName: 'MainNavigator',
      // initialRouteName: 'AuthStack',
    },
  ),
);
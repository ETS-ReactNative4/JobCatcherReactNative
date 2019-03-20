import React from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation';
import JobApplicationListScreen from "../screens/JobApplicationListScreen";
import OverviewScreen from "../screens/OverviewScreen";
import TabBarIcon from "../components/TabBarIcon";
import JobMapScreen from "../screens/JobMapScreen";
import CompareScreen from "../screens/CompareScreen";
import JobApplicationDetailScreen from "../screens/JobApplicationDetailScreen";
import SignInScreen from "../screens/SignInScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";

const HeaderConfig = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#2c2c38',
      borderBottomWidth: 0,
      shadowOpacity: 0,
      shadowOffset: {
        height: 0
      },
      shadowRadius: 0,
      elevation: 0
    },
    headerTintColor: '#ffffff'
  }
};

let OverviewStack = createStackNavigator({OverviewScreen: OverviewScreen}, HeaderConfig);
let JobApplicationListStack = createStackNavigator({
  JobApplicationListScreen: {screen: JobApplicationListScreen},
  JobApplicationDetailScreen: {screen: JobApplicationDetailScreen}
}, HeaderConfig);
let JobMapStack = createStackNavigator({JobMapScreen: JobMapScreen}, HeaderConfig);
let CompareStack = createStackNavigator({CompareScreen: CompareScreen}, HeaderConfig);

OverviewStack.navigationOptions = {
  tabBarLabel: 'Overview',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      name='pie'
      focused={focused}
    />
  )
};

JobApplicationListStack.navigationOptions = {};

JobApplicationListStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    tabBarLabel: 'Job Applications',
    tabBarIcon: ({focused}) => (
      <TabBarIcon name='briefcase' focused={focused}/>
    )
  };
};

JobMapStack.navigationOptions = {
  tabBarLabel: 'JobMap',
  tabBarIcon: ({focused}) => (
    <TabBarIcon name='map' focused={focused}/>
  )
};

CompareStack.navigationOptions = {
  tabBarLabel: 'Compare',
  tabBarIcon: ({focused}) => (
    <TabBarIcon name='pause' focused={focused}/>
  )
};

const BottomNavigatorConfig = {
  initialRouteName: 'JobApplicationListStack',
  tabBarOptions: {
    activeTintColor: '#ffffff', //color when tab is active
    inactiveTintColor: '#bebebe',
    style: {
      backgroundColor: '#2c2c38',
    }
  }
};


const AppStack = createBottomTabNavigator({
  OverviewStack,
  JobApplicationListStack,
  JobMapStack,
  CompareStack
}, BottomNavigatorConfig);
const AuthStack = createStackNavigator({SignInScreen: SignInScreen});

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

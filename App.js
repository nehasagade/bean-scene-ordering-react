import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator} from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Colours from './src/constants/Colours';

import styles from './src/styles/MainStyle';
import ManagerHomeScreen from './src/screens/ManagerHomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import MenuScreen from './src/screens/MenuScreen';
import OrderScreen from './src/screens/OrderScreen';
import ReportScreen from './src/screens/ReportScreen';
import StaffScreen from './src/screens/StaffScreen';
import StaffHomeScreen from "./src/screens/StaffHomeScreen";
import CategoryScreen from "./src/screens/CategoryScreen";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='LoginScreen' 
          component={LoginScreen}
          options={{headerShown: false}} 
        />
        <Stack.Screen 
          name='ManagerHomeScreen'
          options={{headerShown:false}}
          component={ManagerDashboardTab}
        />
        <Stack.Screen 
          name='StaffHomeScreen'
          options={{headerShown:false}}
          component={StaffDashboardTab}
        />
        <Stack.Screen 
          name='Orders'
          component={OrderScreen}
        />
        <Stack.Screen 
          name='Menu'
          component={MenuScreen}
        />
        <Stack.Screen 
          name='Category'
          component={CategoryScreen}
        />
        <Stack.Screen 
        name='Report'
        component={ReportScreen}
      />
      <Stack.Screen 
        name='Staff'
        component={StaffScreen}
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function ManagerDashboardTab() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle: styles.navBar,
        tabBarInactiveTintColor: Colours.white,
        tabBarActiveTintColor: Colours.beanGold,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
      }}>
      <BottomTab.Screen 
        name='Home'
        component={ManagerHomeScreen}
        options={{
          tabBarIcon: (tabInfo) => {
            return(
              <Ionicons 
                name="md-home"
                size={26}
                color={tabInfo.focused ? Colours.beanGold : Colours.white}
              />
            )}
        }}
      />
      <BottomTab.Screen 
        name='Orders'
        component={OrderScreen}
        options={{
          tabBarIcon: (tabInfo) => {
            return(
              <Ionicons 
                name="md-clipboard"
                size={26}
                color={tabInfo.focused ? Colours.beanGold : Colours.white}
              />
            )
          }
        }}
      />
      <BottomTab.Screen 
        name='Menu'
        component={MenuScreen}
        options={{
          tabBarIcon: (tabInfo) => {
            return(
              <Ionicons 
                name="md-restaurant"
                size={26}
                color={tabInfo.focused ? Colours.beanGold : Colours.white}
              />
            )
          }
        }}
      />
       <BottomTab.Screen 
        name='Category'
        component={CategoryScreen}
        options={{
          tabBarIcon: (tabInfo) => {
            return(
              <Ionicons 
                name="md-folder"
                size={26}
                color={tabInfo.focused ? Colours.beanGold : Colours.white}
              />
            )
          }
        }}
      />
      <BottomTab.Screen 
        name='Reports'
        component={ReportScreen}
        options={{
          tabBarIcon: (tabInfo) => {
            return(
              <Ionicons 
                name="md-document"
                size={24}
                color={tabInfo.focused ? Colours.beanGold : Colours.white}
              />
            )
          }
        }}
      />
      <BottomTab.Screen 
        name='Staff'
        component={StaffScreen}
        options={{
          tabBarIcon: (tabInfo) => {
            return(
              <Ionicons 
                name="md-person"
                size={24}
                color={tabInfo.focused ? Colours.beanGold : Colours.white}
              />
            )
          }
        }}
      />
    </BottomTab.Navigator>
  )
}

function StaffDashboardTab() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarStyle: styles.navBar,
        tabBarInactiveTintColor: Colours.white,
        tabBarActiveTintColor: Colours.beanGold,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
      }}>
      <BottomTab.Screen 
        name='Home'
        component={StaffHomeScreen}
        options={{
          tabBarIcon: (tabInfo) => {
            return(
              <Ionicons 
                name="md-home"
                size={26}
                color={tabInfo.focused ? Colours.beanGold : Colours.white}
              />
            )}
        }}
      />
      <BottomTab.Screen 
        name='Orders'
        component={OrderScreen}
        options={{
          tabBarIcon: (tabInfo) => {
            return(
              <Ionicons 
                name="md-clipboard"
                size={26}
                color={tabInfo.focused ? Colours.beanGold : Colours.white}
              />
            )
          }
        }}
      />
      <BottomTab.Screen 
        name='Menu'
        component={MenuScreen}
        options={{
          tabBarIcon: (tabInfo) => {
            return(
              <Ionicons 
                name="md-restaurant"
                size={26}
                color={tabInfo.focused ? Colours.beanGold : Colours.white}
              />
            )
          }
        }}
      />
    </BottomTab.Navigator>
  )
}
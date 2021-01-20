import React from 'react';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { AppTabNavigator } from './AppTabNavigator';
import Sidebarmenu from './SidebarMenu'
import Settingscreen from '../screens/settingscreen';
import { Icon } from 'react-native-elements';



export const AppDrawer = createDrawerNavigator(
    {
        Home: { screen: AppTabNavigator, navigationOptions: {
            drawerIcon: <Icon name = 'home' type = 'Entypo' />
        } },
        Settings: { screen: Settingscreen, navigationOptions: {
            drawerIcon: <Icon name = 'settings' type = 'MaterialIcons' />
        } },
    },
    {
        contentComponent: Sidebarmenu
    },
    {
        initialRouteName: 'Home'
    },


)
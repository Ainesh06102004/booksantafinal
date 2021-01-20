import * as React from 'react';
import { createStackNavigator } from 'react-navigation-stack'
import Bookdonate from '../screens/bookdonate'
import Detailscreen from '../screens/detailscreen'

export const AppStackNavigator = createStackNavigator({
    BookDonateList : {
      screen : Bookdonate,
      navigationOptions:{
        headerShown : false
      }
    },
    Detailscreen : {
      screen : Detailscreen,
      navigationOptions:{
        headerShown : true
      }
    },
  
  },
    {
      initialRouteName: 'BookDonateList'
    }
);
import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Bookdonate from '../screens/bookdonate';
import Bookrequest from '../screens/bookrequest';



export const AppTabNavigator = createBottomTabNavigator({
    DonateBooks: {
        screen: Bookdonate,
        navigationOptions: {

            tabBarLabel: "Donate Books",
        }
    },
    BookRequest: {
        screen: Bookrequest,
        navigationOptions: {

            tabBarLabel: "Book Request",
        }
    }
});
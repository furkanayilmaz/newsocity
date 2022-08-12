import React from 'react';
import Feed from './Screens/Feed';
import WebViewNews from './Screens/WebViewNews';
import SearchNews from './Screens/SearchNews';
import SavedNews from './Screens/SavedNews'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const HomeStack = () => (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={BottomTabs} />
            <Stack.Screen name="Feed" component={Feed} />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
                <Stack.Screen name='WebViewNews' component={WebViewNews} />
            </Stack.Group>
        </Stack.Navigator>
    </NavigationContainer>
)


export const BottomTabs = () => (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarAllowFontScaling: false, tabBarStyle: { backgroundColor: "#fff" } }} >
        <Tab.Screen name="Feed" component={Feed} />
        <Tab.Screen name='Search' component={SearchNews} />
        {/* <Tab.Screen name="Saved" component={SavedNews} /> */}
    </Tab.Navigator>
)
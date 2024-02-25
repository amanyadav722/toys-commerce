import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import CartScreen from '../screens/CartScreen';
import FavouriteScreen from '../screens/FavouritesScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';
import { auth } from '../../firebaseConfig';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  return (
    <Stack.Navigator>
      {!isAuthenticated && (
        <>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        </>
      )}

      {isAuthenticated && (
        <>
          <Stack.Screen
            name="Home"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Details" component={ProductDetailsScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Favourites') {
            iconName = focused ? 'heart' : 'heart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Favourites" component={FavouriteScreen} />
    </Tab.Navigator>
  );
}

export default AppNavigator;


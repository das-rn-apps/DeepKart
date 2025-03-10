import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from '@/src/utils/Colors';

const screens = ['home', 'shop', 'cart', 'profile'];

const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => (
  <View style={styles.tabBar}>
    {state.routes.map((route, index) => {
      const isFocused = state.index === index;
      const icon = route.name === 'home' ? 'home'
        : route.name === 'shop' ? 'search'
          : route.name === 'cart' ? 'cart'
            : 'person';

      return (
        <TouchableOpacity key={route.key} onPress={() => navigation.navigate(route.name)} style={styles.tabButton}>
          {route.name === 'profile' ? (
            <Image source={require('@/src/pngs/panther.png')} style={[styles.profile, isFocused && styles.activeProfile]} />
          ) : isFocused ? (
            <LinearGradient colors={[Colors.primary, Colors.accent]} style={styles.gradient}>
              <Ionicons name={icon} size={30} color={Colors.background.light} />
            </LinearGradient>
          ) : (
            <Ionicons name={`${icon}-outline`} size={30} color={Colors.icon.inactive} />
          )}
        </TouchableOpacity>
      );
    })}
  </View>
);

// Root Layout
export default function TabLayout() {
  return (
    <Tabs tabBar={CustomTabBar}>
      {screens.map(name => (
        <Tabs.Screen key={name} name={name} options={{ headerShown: false }} />
      ))}
    </Tabs>
  );
}

// Styles
const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: Colors.background.light,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 12,
    left: 12,
    right: 12,
    borderRadius: 30,
    elevation: 5,
    shadowColor: Colors.background.dark,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tabButton: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  gradient: { width: 60, height: 45, alignItems: "center", justifyContent: "center", borderRadius: 30 },
  profile: { width: 40, height: 40, borderRadius: 20 },
  activeProfile: { borderWidth: 2, borderColor: Colors.icon.active },
});

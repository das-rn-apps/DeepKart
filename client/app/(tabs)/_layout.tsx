import { View, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from '@/src/utils/Colors';

const screens = ['home', 'shop', 'cart', 'my'];
const icons: Record<string, any> = { home: 'home', shop: 'search', cart: 'cart', my: 'person' };

const CustomTabBar = ({ state, navigation }: any) => (
  <View style={styles.tabBar}>
    {state.routes.map((route: any, index: number) => {
      const isFocused = state.index === index;
      return (
        <TouchableOpacity key={route.key} onPress={() => navigation.navigate(route.name)} style={styles.tabButton}>
          {isFocused ? (
            <LinearGradient colors={[Colors.colors.cyan[200], Colors.colors.cyan[300], Colors.colors.cyan[400]]} style={styles.gradient}>
              <Ionicons name={icons[route.name]} size={30} color={Colors.background.light} />
            </LinearGradient>
          ) : (
            <Ionicons name={`${icons[route.name]}-outline` as any} size={30} color={Colors.icon.inactive} />
          )}
        </TouchableOpacity>
      );
    })}
  </View>
);

export default function TabLayout() {
  return (
    <Tabs tabBar={CustomTabBar}>
      {screens.map(name => <Tabs.Screen key={name} name={name} options={{ headerShown: false }} />)}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: Colors.colors.cyan[100],
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
    paddingHorizontal: 3
  },
  tabButton: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  gradient: { width: 70, height: 45, alignItems: "center", justifyContent: "center", borderRadius: 30 },
});

import { StyleSheet } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack >
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='one' options={{ headerShown: false }} />
      <Stack.Screen name='addresses' options={{ headerShown: false }} />
    </Stack>
  )
}

export default Layout

const styles = StyleSheet.create({})
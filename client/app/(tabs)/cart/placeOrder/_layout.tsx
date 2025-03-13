import { StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <Stack >
                <Stack.Screen name='index' options={{ headerShown: true, title: "Place Order" }} />
                <Stack.Screen name='placed' options={{ headerShown: false }} />
            </Stack>
        </>
    )
}

export default Layout

const styles = StyleSheet.create({})
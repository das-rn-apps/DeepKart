import { StyleSheet } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

const Layout = () => {
    const { productId } = useLocalSearchParams();

    return (
        <Stack >
            <Stack.Screen name='index' options={{ headerShown: false }} />
            <Stack.Screen
                name="[productId]"
                options={({ route }) => ({
                    headerShown: true,
                    title: `${productId}`,
                    statusBarBackgroundColor: "black",
                    headerTitleAlign: "center",
                })}
            />
        </Stack>
    )
}

export default Layout

const styles = StyleSheet.create({})
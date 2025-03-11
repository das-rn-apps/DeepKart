import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';

const Layout = () => {
    const { addressId } = useLocalSearchParams();
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: true,
                    title: 'My Addresses',
                }}
            />
            <Stack.Screen
                name="[addressId]"
                options={({ route }) => ({
                    headerShown: true,
                    title: `Address ID: ${addressId}`,
                })}
            />
        </Stack>
    );
};

export default Layout;

const styles = StyleSheet.create({});
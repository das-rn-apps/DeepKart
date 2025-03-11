import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '@/src/utils/Colors';
import { useRouter } from 'expo-router';

export default function Header() {
    const router = useRouter();

    return (
        <View style={styles.header}>
            <Text style={styles.logo}>DeepKart</Text>

            <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/(extra)/profile')}>
                <Image source={require('@/src/pngs/das.png')} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.background.dark,
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20
    },
    logo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    iconButton: {
        backgroundColor: Colors.primary,
        borderRadius: 15,
    },
    icon: {
        width: 30,
        height: 30,
    },
});

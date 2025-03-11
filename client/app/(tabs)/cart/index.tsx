import Footer from '@/components/homepage/Footer';
import Header from '@/components/homepage/Header';
import { Colors } from '@/src/utils/Colors';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CartScreen() {
    return (
        <View style={styles.container}>
            <Header />
            <Text>Your Cart</Text>
            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colors.red[100]
    },
});
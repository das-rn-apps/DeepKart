import React, { useState } from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors } from '@/src/utils/Colors';
import { router } from 'expo-router';

const ConfirmPlacing = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handlePlaceOrder = () => {
        setIsLoading(true);
        router.push('/cart/placeOrder/placed')
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.placeOrderButton}
                onPress={handlePlaceOrder}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color={Colors.background.light} />
                ) : (
                    <Text style={styles.placeOrderButtonText}>Place Order</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.colors.gray[200],
    },
    placeOrderButton: {
        backgroundColor: Colors.colors.blue[500],
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    placeOrderButtonText: {
        color: Colors.background.light,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ConfirmPlacing;
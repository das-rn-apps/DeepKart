// components/cart/CartSummary.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/src/utils/Colors';

interface CartSummaryProps {
    total: number;
    onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ total, onCheckout }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
            <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
                <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: Colors.colors.gray[200],
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    checkoutButton: {
        backgroundColor: Colors.colors.blue[500],
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    checkoutText: {
        color: Colors.colors.blue[100],
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CartSummary;
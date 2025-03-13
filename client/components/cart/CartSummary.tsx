import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/src/utils/Colors';
import { MaterialIcons } from '@expo/vector-icons'; // Import icons from Expo vector icons

interface CartSummaryProps {
    total: number;
    onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ total, onCheckout }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
                </View>
                <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
                    <MaterialIcons name="shopping-cart" size={20} color={Colors.background.light} />
                    <Text style={styles.checkoutText}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: Colors.colors.gray[200],
        backgroundColor: Colors.colors.green[100],
        shadowColor: Colors.colors.gray[500],
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.colors.gray[500],
    },
    totalAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.colors.gray[600],
    },
    checkoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.colors.blue[500],
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        gap: 8, // Space between icon and text
        shadowColor: Colors.colors.blue[600],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    checkoutText: {
        color: Colors.background.light,
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CartSummary;
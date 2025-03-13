import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/src/utils/Colors';

const OrderSection = () => {
    // Mock order details
    const orderItems = [
        { name: 'Product 1', quantity: 2, price: 29.99 },
        { name: 'Product 2', quantity: 1, price: 49.99 },
    ];

    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Order Details</Text>
            {orderItems.map((item, index) => (
                <View key={index} style={styles.itemContainer}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDetails}>
                        {item.quantity} x ${item.price.toFixed(2)}
                    </Text>
                </View>
            ))}
            <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.colors.gray[200],
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.colors.gray[600],
        marginBottom: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    itemName: {
        fontSize: 16,
        color: Colors.colors.gray[600],
    },
    itemDetails: {
        fontSize: 16,
        color: Colors.colors.gray[600],
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.colors.gray[600],
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.colors.gray[600],
    },
});

export default OrderSection;
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/src/utils/Colors';
import { ICartItem } from '@/src/utils/types';

interface CartItemProps {
    item: ICartItem
    onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: item.productId.images[0] }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.name}>{item.productId.name}</Text>
                <Text style={styles.price}>${item.productId.price.toFixed(2)}</Text>
                <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
            </View>
            <TouchableOpacity onPress={() => onRemove(item.productId._id)} style={styles.removeButton}>
                <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.colors.gray[200],
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    details: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
        color: Colors.colors.gray[600],
    },
    quantity: {
        fontSize: 14,
        color: Colors.colors.gray[600],
    },
    removeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    removeText: {
        color: Colors.colors.red[500],
        fontWeight: 'bold',
    },
});

export default CartItem;
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/src/utils/Colors';
import { ICartItem } from '@/src/utils/types';

interface CartItemProps {
    item: ICartItem;
    onRemove: (id: string) => void;
    onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove, onUpdateQuantity }) => (
    <View style={styles.container}>
        <Image source={{ uri: item.productId.images[0] }} style={styles.image} />
        <View style={styles.details}>
            <View style={styles.textContainer}>
                <Text style={styles.name}>{item.productId.name}</Text>
                <Text style={styles.price}>${item.productId.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actionsContainer}>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        onPress={() => item.quantity > 1 && onUpdateQuantity(item.productId._id, item.quantity - 1)}
                        style={[styles.quantityButton, item.quantity === 1 && styles.disabledButton]}
                        disabled={item.quantity === 1}
                    >
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                        onPress={() => onUpdateQuantity(item.productId._id, item.quantity + 1)}
                        style={styles.quantityButton}
                    >
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => onRemove(item.productId._id)} style={styles.removeButton}>
                    <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        margin: 3,
        marginHorizontal: 10,
        backgroundColor: Colors.colors.blue[100],
        borderRadius: 2,
        shadowColor: Colors.colors.gray[500],
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: 80,
        borderRadius: 5,
        marginRight: 16,
    },
    details: {
        flex: 1,
        justifyContent: 'space-between',
    },
    textContainer: {
        marginBottom: 5,
    },
    name: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
        color: Colors.colors.blue[500],
        fontWeight: "bold",
        marginTop: 2,
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.colors.blue[200],
        borderRadius: 20,
    },
    quantityButton: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.colors.blue[300],
        borderRadius: 16,
        shadowColor: Colors.colors.gray[500],
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    disabledButton: {
        backgroundColor: Colors.colors.gray[200],
    },
    quantityButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantity: {
        fontSize: 14,
        marginHorizontal: 10,
        fontWeight: 'bold',
    },
    removeButton: {
        padding: 8,
        backgroundColor: Colors.colors.red[200],
        borderRadius: 8,
    },
    removeText: {
        color: Colors.colors.red[500],
        fontWeight: 'bold',
    },
});

export default CartItem;
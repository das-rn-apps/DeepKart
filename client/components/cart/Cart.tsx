import { ActivityIndicator, FlatList, Text, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ICartItem } from '@/src/utils/types';
import { getCart, removeCartItem } from '@/src/services/cart';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

const Cart = () => {
    const [cartItems, setCartItems] = useState<ICartItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchCart = async () => {
        try {
            const data = await getCart();
            setCartItems(data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleRemoveItem = async (productId: string) => {
        Alert.alert(
            'Remove Item',
            'Are you sure you want to remove this item from your cart?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await removeCartItem(productId);
                            await fetchCart(); // Re-fetch cart data after removal
                        } catch (error) {
                            console.error('Error removing item:', error);
                            Alert.alert('Error', 'Failed to remove item. Please try again.');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const total = cartItems.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <>
            {cartItems.length === 0 ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Your cart is empty</Text>
                </View>
            ) : (
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <CartItem item={item} onRemove={handleRemoveItem} />
                    )}
                />
            )}
            <CartSummary total={total} onCheckout={() => console.log('Proceeding to checkout...')} />
        </>
    );
};

export default Cart;
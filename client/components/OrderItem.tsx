import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { IOrder, IOrderItem, IProduct } from '@/src/utils/types';
import { Colors } from '@/src/utils/Colors';

const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).format(date);
};

const OrderItem = ({ order }: { order: IOrder }) => {
    return (
        <View style={styles.card}>
            {/* Order Status & Date */}
            <Text style={styles.orderStatus}>{order.orderStatus}</Text>
            <Text style={styles.date}>Ordered on {formatDate(new Date(order.createdAt))}</Text>

            {/* Product List */}
            {order.items.map((item, index) => {
                const product = item.productId as unknown as IProduct;
                return (
                    <View key={index} style={styles.productContainer}>
                        <Image
                            source={{ uri: product?.images?.[0] || 'https://via.placeholder.com/50' }}
                            style={styles.productImage}
                        />
                        <View style={styles.productDetails}>
                            <Text style={styles.productName}>{product?.name || 'Product Name'}</Text>
                            <Text style={styles.price}>₹{item.price} × {item.quantity}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.price}>₹{item.price * item.quantity}</Text>
                        </View>
                    </View>
                );
            })}

            {/* Order Summary */}
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>Total: ₹{order.totalAmount}</Text>
                {order.trackingNumber && <Text style={styles.tracking}>Tracking No: {order.trackingNumber}</Text>}
            </View>

            {/* Shipping Address */}
            <Text style={styles.shippingAddress}>Shipping To: {order.shippingAddress}</Text>
        </View>
    );
};

export default OrderItem;

const styles = StyleSheet.create({
    card: {
        backgroundColor: Colors.background.light,
        marginHorizontal: 7,
        marginBottom: 2,
        padding: 15,
        shadowColor: Colors.background.dark,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        borderWidth: 1,
        borderColor: Colors.border,
    },
    orderStatus: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.status.success,
    },
    date: {
        fontSize: 12,
        color: Colors.text.secondary,
        marginBottom: 10,
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 1,
        padding: 2
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    productDetails: {
        flex: 5,
    },
    productName: {
        fontSize: 14,
        fontWeight: '500',
        color: Colors.text.primary,
    },
    price: {
        fontSize: 12,
        color: Colors.text.secondary,
    },
    summary: {
        marginTop: 5,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingTop: 5,
    },
    totalAmount: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.text.primary,
        textAlign: "right"
    },
    tracking: {
        fontSize: 12,
        color: Colors.text.secondary,
    },
    shippingAddress: {
        fontSize: 12,
        color: Colors.text.secondary,
    },
});

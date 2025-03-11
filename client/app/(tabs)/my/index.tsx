import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '@/src/utils/Colors'; // Adjust path as needed
import { IOrder } from '@/src/utils/types'; // Adjust path and type as needed
import OrderItem from '@/components/OrderItem';
import { getOrders } from '@/src/services/orderService';
import Header from '@/components/homepage/Header';
import Footer from '@/components/homepage/Footer';

interface OrderListItem {
    type: 'header' | 'orders' | 'footer';
    data?: IOrder[];
}

const OrdersPage = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setError('Failed to load orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    const data: OrderListItem[] = [
        { type: 'header' },
        { type: 'orders', data: orders },
        { type: 'footer' },
    ];

    const renderItem = ({ item }: { item: OrderListItem }) => {
        switch (item.type) {
            case 'header':
                return <Header />;
            case 'orders':
                return (
                    <View>
                        {item.data && item.data.length > 0 ? (
                            item.data.map((order) => <OrderItem key={order._id} order={order} />)
                        ) : (
                            <Text style={styles.noOrdersText}>No orders found.</Text>
                        )}
                    </View>
                );
            case 'footer':
                return <Footer />;
            default:
                return null;
        }
    };

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.container}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colors.purple[100],
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
    },
    noOrdersText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: Colors.text.primary,
    },
});

export default OrdersPage;

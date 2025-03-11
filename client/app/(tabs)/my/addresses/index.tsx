import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { getAddresses } from '@/src/services/userService';
import { IAddress } from '@/src/utils/types';

export default function AddressesScreen() {
    const [addresses, setAddresses] = useState<IAddress[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const data = await getAddresses();
                setAddresses(data);
            } catch (error) {
                console.error('Error fetching addresses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, []);

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <FlatList
            data={addresses}
            renderItem={({ item }) => (
                <View style={styles.addressItem}>
                    <Link href={`/profile/addresses/${item._id}` as any}>
                        <Text>{item.addressLine1}, {item.city}</Text>
                        <Text>{item.addressLine2}, {item.country}</Text>
                        <Text>{item.postalCode}, {item.state}</Text>
                    </Link>
                </View>
            )}
            keyExtractor={(item) => item._id}
            style={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});
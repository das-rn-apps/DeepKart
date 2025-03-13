import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { getAddresses } from '@/src/services/user';
import { IAddress } from '@/src/utils/types';
import { Colors } from '@/src/utils/Colors';

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
                <View style={[styles.addressItem, item.isDefault && { borderColor: Colors.colors.blue[500] }]}>
                    <Link href={`/profile/addresses/${item._id}` as any} style={styles.link}>
                        <View>
                            <Text style={styles.addressText}>{item.addressLine1}, {item.city}</Text>
                            <Text style={styles.addressTextSecondary}>{item.addressLine2}, {item.country}</Text>
                            <Text style={styles.addressTextSecondary}>{item.postalCode}, {item.state}</Text>
                        </View>
                    </Link>
                </View>
            )}
            keyExtractor={(item) => item._id}
            style={styles.container}
            numColumns={2}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colors.lime[100],
        padding: 5
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressItem: {
        backgroundColor: Colors.colors.indigo[100],
        borderRadius: 3,
        padding: 16,
        margin: 5,
        elevation: 3,
        shadowColor: Colors.background.dark,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        borderWidth: 2,
        borderColor: Colors.colors.indigo[200],
        flex: 1
    },
    addressText: {
        fontSize: 16,
        marginBottom: 4,
        color: Colors.colors.indigo[600],
    },
    addressTextSecondary: {
        fontSize: 14,
        color: Colors.text.secondary,
    },
    link: {
        textDecorationLine: 'none',
    },
});
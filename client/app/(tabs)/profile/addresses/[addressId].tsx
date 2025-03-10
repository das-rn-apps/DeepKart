import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getAddressById } from "@/src/services/userService";
import { IAddress } from "@/src/utils/types";
import { Colors } from "@/src/utils/Colors";

export default function AddressDetailsScreen() {
    const { addressId } = useLocalSearchParams();
    const [address, setAddress] = useState<IAddress | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                console.log("Fetching address for ID:", addressId);
                const data = await getAddressById(addressId);
                setAddress(data);
            } catch (error) {
                console.error("Error fetching address:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAddress();
    }, [addressId]);

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (!address) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Address not found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                {/* Address Details */}
                <Text style={styles.title}>Address Details</Text>
                <Text style={styles.text}><Text style={styles.label}>Address Line 1:</Text> {address.addressLine1}</Text>
                {address.addressLine2 && (
                    <Text style={styles.text}><Text style={styles.label}>Address Line 2:</Text> {address.addressLine2}</Text>
                )}
                <Text style={styles.text}><Text style={styles.label}>City:</Text> {address.city}</Text>
                <Text style={styles.text}><Text style={styles.label}>State:</Text> {address.state}</Text>
                <Text style={styles.text}><Text style={styles.label}>Postal Code:</Text> {address.postalCode}</Text>
                <Text style={styles.text}><Text style={styles.label}>Country:</Text> {address.country}</Text>

                {/* Default Address Indicator */}
                {address.isDefault && <Text style={styles.defaultBadge}>Default Address</Text>}

                {/* Created & Updated At */}
                <Text style={styles.date}>Created: {new Date(address.createdAt).toLocaleDateString()}</Text>
                <Text style={styles.date}>Updated: {new Date(address.updatedAt).toLocaleDateString()}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.light,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        width: "100%",
        backgroundColor: Colors.background.light,
        padding: 20,
        borderRadius: 12,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        color: Colors.text.primary,
        textAlign: "center",
    },
    text: {
        fontSize: 16,
        color: Colors.text.secondary,
        marginBottom: 8,
    },
    label: {
        fontWeight: "bold",
        color: Colors.text.primary,
    },
    defaultBadge: {
        marginTop: 10,
        alignSelf: "flex-start",
        backgroundColor: Colors.status.success,
        color: Colors.text.white,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 6,
        fontSize: 14,
        fontWeight: "bold",
    },
    date: {
        fontSize: 14,
        color: Colors.colors.gray[500],
        marginTop: 5,
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        fontSize: 18,
        color: Colors.status.error,
        fontWeight: "bold",
    },
});


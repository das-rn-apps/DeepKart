import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import ProductGrid from './ProductGrid';
import { IProduct } from '@/src/utils/types';
import { getProducts } from '@/src/services/productService';
import { Colors } from '@/src/utils/Colors';

export default function DealsSection() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Deal Selection</Text>
            <ProductGrid products={products} />
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        padding: 10,
        backgroundColor: Colors.colors.red[100],
        elevation: 1,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.text.primary,
    },
});
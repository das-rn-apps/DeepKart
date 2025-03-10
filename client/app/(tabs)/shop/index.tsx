import Header from '@/components/homepage/Header';
import SearchBar from '@/components/SearchBar';
import ProductItem from '@/components/ProductItem';
import { getProducts } from '@/src/services/productService';
import { IProduct } from '@/src/utils/types';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Colors } from '@/src/utils/Colors';

export default function ShopScreen() {
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
        return <View style={styles.loading}><ActivityIndicator size="large" /></View>;
    }

    return (
        <View style={styles.container}>
            <Header />
            <SearchBar />
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductItem product={item} />}
                keyExtractor={(item) => item._id}
                style={styles.container}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colors.cyan[100]
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
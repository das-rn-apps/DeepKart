import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import ProductCarousel from './ProductCarousel';
import { IProduct } from '@/src/utils/types';
import { getProducts } from '@/src/services/productService';

export default function CarouselSection() {
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

    return <ProductCarousel products={products} />;
}
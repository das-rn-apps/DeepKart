import { Colors } from '@/src/utils/Colors';
import { IProduct } from '@/src/utils/types';
import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import ProductItem from '../ProductItem';


interface ProductGridProps {
    products: IProduct[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
    return (
        <FlatList
            data={products}
            renderItem={({ item }) => <ProductItem product={item} />}
            keyExtractor={(item) => item._id}
            horizontal
        />
    );
};


export default ProductGrid;
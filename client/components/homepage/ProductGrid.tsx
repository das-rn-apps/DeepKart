import { Colors } from '@/src/utils/Colors';
import { IProduct } from '@/src/utils/types';
import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';


interface ProductGridProps {
    products: IProduct[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
    const renderItem = ({ item }: { item: IProduct }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.images[0] }} style={styles.image} />
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.price}>₹{item.price}</Text>
        </View>
    );

    return (
        <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            horizontal
        />
    );
};

const styles = StyleSheet.create({
    item: {
        flex: 1,
        backgroundColor: Colors.background.light,
        borderRadius: 8,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 120,
        height: 120,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    title: {
        fontSize: 12,
        color: Colors.text.primary,
    },
    price: {
        fontSize: 12,
        color: Colors.colors.green[500],
    },
});

export default ProductGrid;
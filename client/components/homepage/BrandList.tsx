import { Colors } from '@/src/utils/Colors';
import React from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';

interface Brand {
    id: string;
    logo: string;
}

interface BrandListProps {
    brands: Brand[];
}

const BrandList: React.FC<BrandListProps> = ({ brands }) => {
    const renderItem = ({ item }: { item: Brand }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.logo }} style={styles.logo} />
        </View>
    );

    return (
        <FlatList
            data={brands}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: Colors.background.light,
        borderRadius: 8,
        padding: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        elevation: 2,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
    },
    logo: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
});

export default BrandList;
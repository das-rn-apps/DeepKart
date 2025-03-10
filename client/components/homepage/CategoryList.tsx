import { Colors } from '@/src/utils/Colors';
import { ICategory } from '@/src/utils/types';
import React from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';

interface CategoryListProps {
    categories: ICategory[]
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
    const renderItem = ({ item }: { item: ICategory }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.title}>{item.name}</Text>
        </View>
    );

    return (
        <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
        />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        padding: 10
    },
    item: {
        backgroundColor: Colors.background.light,
        borderRadius: 10,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 120,
        elevation: 4,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    image: {
        width: 100,
        height: 90,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    title: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.primary,
        textAlign: 'center',
        height: 30,
        paddingHorizontal: 2,
        textAlignVertical: "center"
    },
});

export default CategoryList;

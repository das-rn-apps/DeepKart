import { Colors } from '@/src/utils/Colors';
import { ICategory } from '@/src/utils/types';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CategoryCardProps {
    category: ICategory;
}

export default function CategoryCard({ category }: CategoryCardProps) {
    return (
        <TouchableOpacity style={styles.card}>
            {/* <Image source={{ uri: category.imageUrl }} style={styles.image} /> */}
            <Image source={require('@/src/pngs/das.png')} style={styles.image} />
            <Text style={styles.name}>
                {category.name.length > 12 ? category.name.substring(0, 10) + "..." : category.name}
            </Text>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 5,
        borderRadius: 5,
        backgroundColor: Colors.background.light,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 80,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    name: {
        padding: 5,
        fontSize: 10,
        textAlign: 'center',
    },
});
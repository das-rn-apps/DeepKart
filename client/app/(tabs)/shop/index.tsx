import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CategoryCard from '@/components/category/CategoryCard';
import { ICategory } from '@/src/utils/types';
import { getCategories } from '@/src/services/category';
import Header from '@/components/homepage/Header';
import { Colors } from '@/src/utils/Colors';


export default function CategoriesScreen() {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);
    return (
        <View style={styles.container}>
            <Header />
            <FlatList
                data={categories}
                renderItem={({ item }) => <CategoryCard category={item} />}
                keyExtractor={(item) => item._id}
                numColumns={4}
                contentContainerStyle={styles.grid}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.light
    },
    grid: {
        justifyContent: 'space-between',
    },
});
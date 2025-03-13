import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import CategoryList from './CategoryList';
import { Colors } from '@/src/utils/Colors';
import { ICategory } from '@/src/utils/types';
import { getCategories } from '@/src/services/category';

export default function CategoriesSection() {
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

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Browse Categories</Text>
            <CategoryList categories={categories} />
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        backgroundColor: Colors.colors.cyan[100],
        padding: 10,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.text.primary,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


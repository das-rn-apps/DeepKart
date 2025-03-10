import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Colors } from '@/src/utils/Colors';

import CarouselSection from '@/components/homepage/CarouselSection';
import CategoriesSection from '@/components/homepage/CategoriesSection';
import FeaturedProductsSection from '@/components/homepage/FeaturedProductsSection';
import DealsSection from '@/components/homepage/DealsSection';
import RecommendedSection from '@/components/homepage/RecommendedSection';
import Header from '@/components/homepage/Header';
import Footer from '@/components/homepage/Footer';

interface HomeItem {
    type:
    | 'header'
    | 'carousel'
    | 'categories'
    | 'featuredProducts'
    | 'deals'
    | 'brands'
    | 'recommended'
    | 'footer';
}

export default function HomeScreen() {
    const data: HomeItem[] = [
        { type: 'header' },
        { type: 'carousel' },
        { type: 'categories' },
        { type: 'featuredProducts' },
        { type: 'deals' },
        { type: 'brands' },
        { type: 'recommended' },
        { type: 'footer' },
    ];

    const renderItem = ({ item }: { item: HomeItem }) => {
        switch (item.type) {
            case 'header':
                return <Header />;
            case 'carousel':
                return <CarouselSection />;
            case 'categories':
                return <CategoriesSection />;
            case 'featuredProducts':
                return <FeaturedProductsSection />;
            case 'deals':
                return <DealsSection />;
            case 'recommended':
                return <RecommendedSection />;
            case 'footer':
                return <Footer />;
            default:
                return null;
        }
    };

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.light,
    },
});
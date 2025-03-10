import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Colors } from '@/src/utils/Colors';
import { IProduct } from '@/src/utils/types';

interface ProductCarouselProps {
    products: IProduct[];
}

const { width } = Dimensions.get('window');

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
    return (
        <Carousel
            data={products}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <Image source={{ uri: item.images[0] }} style={styles.image} />
                    <Text style={styles.title}>{item.name}</Text>
                </View>
            )}
            width={width}
            height={240}
            loop
            autoPlay
            autoPlayInterval={0}
            scrollAnimationDuration={2000}
            style={styles.carousel}
        />
    );
};

const styles = StyleSheet.create({
    carousel: {
        alignSelf: 'center',
        backgroundColor: Colors.colors.indigo[200]
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: "100%",
        height: 200,
        marginBottom: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text.primary,
        textAlign: 'center',
    },
});

export default ProductCarousel;

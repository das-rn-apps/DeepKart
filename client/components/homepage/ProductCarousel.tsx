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
                    <View style={styles.imageContainer}>
                        <Image source={require('@/src/pngs/das.png')} style={styles.image} />
                        {/* <Image source={{ uri: item.images[0] }} style={styles.image} /> */}
                        <View style={styles.textOverlay}>
                            <Text style={styles.title}>{item.name}</Text>
                        </View>
                    </View>
                </View>
            )}
            width={width}
            height={200}
            loop
            autoPlay
            autoPlayInterval={0}
            scrollAnimationDuration={2000}
        />
    );
};

const styles = StyleSheet.create({
    item: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: '100%',
        height: 200,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    textOverlay: {
        position: 'absolute',
        bottom: 10, // Adjust as needed
        left: 10, // Adjust as needed
        right: 10, // Adjust as needed
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text.white,
        textAlign: 'center',
    },
});

export default ProductCarousel;
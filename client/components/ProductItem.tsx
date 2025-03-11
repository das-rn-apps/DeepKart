import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { IProduct } from "@/src/utils/types";
import { Colors } from "@/src/utils/Colors";
import { FontAwesome } from "@expo/vector-icons";

const ProductItem = ({ product }: { product: IProduct }) => {
    const router = useRouter();

    const handleProductPress = () => {
        router.push(`/shop/${product._id}`);
    };

    // Generate stars based on the rating
    const renderStars = (rating: number) => {
        const stars = [];
        const maxStars = 5;
        const roundedRating = Math.round(rating * 2) / 2; // Rounds to nearest 0.5

        for (let i = 1; i <= maxStars; i++) {
            if (i <= roundedRating) {
                stars.push(<FontAwesome key={i} name="star" size={14} color={Colors.status.warning} />);
            } else if (i - 0.5 === roundedRating) {
                stars.push(<FontAwesome key={i} name="star-half-empty" size={14} color={Colors.status.warning} />);
            } else {
                stars.push(<FontAwesome key={i} name="star-o" size={14} color={Colors.text.secondary} />);
            }
        }
        return stars;
    };

    return (
        <Pressable onPress={handleProductPress} style={({ pressed }) => [styles.productContainer, pressed && styles.pressed]}>
            {/* <Image source={{ uri: product.images[0] }} style={styles.image} /> */}
            <Image source={require('@/src/pngs/das.png')} style={styles.image} />


            <View style={styles.details}>
                <Text style={styles.brand}>{product.brand}</Text>
                <Text style={styles.name} numberOfLines={1}>{product.name}</Text>

                <View style={styles.priceRow}>
                    <Text style={styles.price}>₹{product.discountedPrice ?? product.price}</Text>
                    {product.discountedPrice && <Text style={styles.originalPrice}>₹{product.price}</Text>}
                </View>

                <View style={styles.ratingRow}>
                    {renderStars(product.ratings)}
                    <Text style={styles.reviewCount}>({product.reviews})</Text>
                </View>
                <Text style={[styles.stock, product.stock > 0 ? styles.inStock : styles.outOfStock]}>
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </Text>
            </View>
        </Pressable>
    );
};

export default ProductItem;

const styles = StyleSheet.create({
    productContainer: {
        flex: 1,
        backgroundColor: Colors.colors.gray[100],
        margin: 5,
        overflow: 'hidden',
        elevation: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    pressed: {
        opacity: 0.75,
    },
    image: {
        width: "100%",
        minWidth: 150,
        height: 150,
    }
    ,
    details: {
        padding: 10,
    },
    brand: {
        fontSize: 7,
        color: Colors.text.secondary,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
    name: {
        fontWeight: '500',
        color: Colors.text.primary,
        fontSize: 12,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontWeight: 'bold',
        color: Colors.status.success,
        fontSize: 13,
    },
    originalPrice: {
        textDecorationLine: 'line-through',
        color: Colors.text.secondary,
        marginLeft: 10,
        fontSize: 13
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewCount: {
        fontSize: 10,
        color: Colors.text.secondary,
        marginLeft: 6,
    },
    stock: {
        fontSize: 10,
        fontWeight: '600',
    },
    inStock: {
        color: Colors.status.success,
    },
    outOfStock: {
        color: Colors.status.error,
    },
});
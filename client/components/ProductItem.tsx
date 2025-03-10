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
            <Image source={{ uri: product.images[0] }} style={styles.image} />

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
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.background.light,
        borderRadius: 12,
        margin: 5,
        height: 85,
        gap: 10
    },
    pressed: {
        opacity: 0.75,
    },
    image: {
        width: 150,
        height: 85,
        marginRight: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    details: {
        flex: 1,
        height: 85
    },
    brand: {
        fontSize: 10,
        color: Colors.text.secondary,
        textTransform: "uppercase",
        fontWeight: "500",
    },
    name: {
        fontWeight: "600",
        color: Colors.text.primary,
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    price: {
        fontWeight: "bold",
        color: Colors.status.success,
    },
    originalPrice: {
        textDecorationLine: "line-through",
        color: Colors.text.secondary,
        marginLeft: 5,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    reviewCount: {
        fontSize: 12,
        color: Colors.text.secondary,
        marginLeft: 6,
    },
    stock: {
        fontSize: 13,
        fontWeight: "600",
    },
    inStock: {
        color: Colors.status.success,
    },
    outOfStock: {
        color: Colors.status.error,
    },
});

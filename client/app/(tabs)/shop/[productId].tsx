import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    ActivityIndicator,
    FlatList,
    Dimensions,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getProductById } from "@/src/services/productService";
import { IProduct } from "@/src/utils/types";
import { Colors } from "@/src/utils/Colors";
import { FontAwesome } from "@expo/vector-icons";

const { width: screenWidth } = Dimensions.get("window");

export default function ProductDetailsScreen() {
    const { productId } = useLocalSearchParams();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(productId);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (!product) {
        return (
            <View style={styles.container}>
                <Text style={styles.notFound}>Product not found.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {/* Image Carousel */}
            <View style={styles.carouselContainer}>
                <FlatList
                    data={product.images}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Image source={{ uri: item }} style={styles.image} />
                    )}
                />
            </View>

            {/* Title & Brand */}
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.brand}>{product.brand}</Text>

            {/* Price Section */}
            <View style={styles.priceRow}>
                <Text style={styles.price}>₹{product.discountedPrice ?? product.price}</Text>
                {product.discountedPrice && (
                    <Text style={styles.originalPrice}>₹{product.price}</Text>
                )}
            </View>

            {/* Rating Row */}
            <View style={styles.ratingRow}>
                <FontAwesome name="star" size={16} color={Colors.status.warning} />
                <Text style={styles.rating}>{product.ratings.toFixed(1)}</Text>
                <Text style={styles.reviewCount}>
                    ({Array.isArray(product.reviews) ? product.reviews.length : "No"} Reviews)
                </Text>
            </View>

            {/* Stock Information */}
            <View style={[styles.stockBadge, product.stock > 0 ? styles.inStock : styles.outOfStock]}>
                <Text style={styles.stockText}>
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </Text>
            </View>

            {/* Description */}
            <Text style={styles.description}>{product.description}</Text>

            {/* Attributes */}
            <View style={styles.attributesContainer}>
                <Text style={styles.attributesTitle}>Product Details:</Text>
                {Object.entries(product.attributes).map(([key, value]) => (
                    <View key={key} style={styles.attributeRow}>
                        <Text style={styles.attributeKey}>{key}:</Text>
                        <Text style={styles.attributeValue}>{value}</Text>
                    </View>
                ))}
            </View>

            {/* Metadata */}
            <Text style={styles.metaText}>Category: {product.category}</Text>
            <Text style={styles.metaText}>
                Added on: {new Date(product.createdAt).toDateString()}
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.light,
        padding: 16,
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    notFound: {
        fontSize: 18,
        color: Colors.text.primary,
        textAlign: "center",
        marginTop: 20,
    },
    carouselContainer: {
        height: 300,
        width: screenWidth - 32,
        borderRadius: 10,
        overflow: "hidden",
    },
    image: {
        width: screenWidth - 32,
        height: 300,
        resizeMode: "cover",
        backgroundColor: Colors.background.dark,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: Colors.text.primary,
        marginBottom: 4,
    },
    brand: {
        fontSize: 14,
        color: Colors.text.secondary,
        marginBottom: 8,
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    price: {
        fontSize: 22,
        fontWeight: "bold",
        color: Colors.status.success,
    },
    originalPrice: {
        fontSize: 16,
        textDecorationLine: "line-through",
        color: Colors.text.secondary,
        marginLeft: 10,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    rating: {
        fontSize: 16,
        fontWeight: "600",
        color: Colors.status.warning,
        marginLeft: 6,
    },
    reviewCount: {
        fontSize: 14,
        color: Colors.text.secondary,
        marginLeft: 6,
    },
    stockBadge: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
        alignSelf: "flex-start",
        marginBottom: 8,
    },
    inStock: {
        backgroundColor: Colors.status.success,
    },
    outOfStock: {
        backgroundColor: Colors.status.error,
    },
    stockText: {
        fontSize: 14,
        fontWeight: "600",
        color: Colors.text.white,
    },
    description: {
        fontSize: 16,
        color: Colors.text.primary,
        lineHeight: 22,
        marginBottom: 12,
    },
    attributesContainer: {
        marginTop: 12,
        padding: 10,
        backgroundColor: Colors.background.dark,
        borderRadius: 8,
    },
    attributesTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.text.primary,
        marginBottom: 8,
    },
    attributeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    attributeKey: {
        fontSize: 14,
        fontWeight: "500",
        color: Colors.text.secondary,
    },
    attributeValue: {
        fontSize: 14,
        color: Colors.text.primary,
    },
    metaText: {
        fontSize: 14,
        color: Colors.text.secondary,
        marginTop: 8,
    },
});

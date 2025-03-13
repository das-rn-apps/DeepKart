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
    Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getProductById } from "@/src/services/product";
import { IProduct } from "@/src/utils/types";
import { Colors } from "@/src/utils/Colors";
import { FontAwesome } from "@expo/vector-icons";
import Footer from "@/components/homepage/Footer";
import ProductActions from "@/components/ProductActions";
import { addCartItem } from "@/src/services/cart";

const { width: screenWidth } = Dimensions.get("window");

export default function ProductDetailsScreen() {
    const { productId } = useLocalSearchParams<{ productId: string }>();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(productId as string);
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

    const handleAddToCart = async () => {
        try {
            await addCartItem(productId);
        } catch (error) {
            console.error('Error adding item:', error);
            Alert.alert('Error', 'Failed to adding item. Please try again.');
        }
    };
    const handleBuyNow = async () => {
        try {
            // await addCartItem(productId);
            console.log("Buyingggggg")
        } catch (error) {
            console.error('Error buy item:', error);
            Alert.alert('Error', 'Failed to buy item. Please try again.');
        }
    };


    return (
        <ScrollView style={styles.container}>
            {/* Image Carousel */}
            <FlatList
                data={product.images}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    // <Image source={{ uri: item }} style={styles.image} />
                    <Image source={require('@/src/pngs/das.png')} style={styles.image} />

                )}
            />

            {/* Title & Brand */}
            <View style={{ marginHorizontal: 16 }}>

                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.brand}>{product.brand}</Text>

                {/* Price & Stock */}
                <View style={styles.card}>
                    <View style={styles.priceRow}>
                        <Text style={styles.price}>₹{product.discountedPrice ?? product.price}</Text>
                        {product.discountedPrice && (
                            <Text style={styles.originalPrice}>₹{product.price}</Text>
                        )}
                    </View>
                    <Text style={[styles.stockText, product.stock > 0 ? styles.inStock : styles.outOfStock]}>
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </Text>
                </View>

                {/* Rating & Reviews */}
                <View style={styles.ratingRow}>
                    <FontAwesome name="star" size={16} color={Colors.status.warning} />
                    <Text style={styles.rating}>{product.ratings.toFixed(1)}</Text>
                    <Text style={styles.reviewCount}>
                        ({Array.isArray(product.reviews) ? product.reviews.length : "No"} Reviews)
                    </Text>
                </View>

                {/* Description */}
                <Text style={styles.description}>{product.description}</Text>

                {/* Product Attributes */}
                <View style={styles.attributesContainer}>
                    <Text style={styles.attributesTitle}>Product Details:</Text>
                    {Object.entries(product.attributes).map(([key, value], index) => (
                        <View key={key} style={styles.attributeRow}>
                            <Text style={styles.attributeSlNo}>{index + 1}.</Text>
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
            </View>
            <ProductActions onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />

            <Footer />

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.light,
        paddingBottom: 20,
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
    image: {
        width: screenWidth,
        height: 320,
        resizeMode: "cover",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.text.primary,
        marginTop: 12,
    },
    brand: {
        fontSize: 14,
        color: Colors.text.secondary,
        marginBottom: 8,
    },
    card: {
        backgroundColor: Colors.colors.brown[100],
        padding: 7,
        borderRadius: 5,
    },
    priceRow: {
        flexDirection: "row",
        alignItems: "center",
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
    stockText: {
        fontSize: 14,
        fontWeight: "600",
        color: Colors.text.white,
        padding: 6,
        borderRadius: 5,
        alignSelf: "flex-start",
    },
    inStock: {
        backgroundColor: Colors.status.success,
    },
    outOfStock: {
        backgroundColor: Colors.status.error,
    },
    ratingRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
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
    description: {
        fontSize: 16,
        color: Colors.text.primary,
        lineHeight: 22,
        marginVertical: 12,
    },
    attributesContainer: {
        backgroundColor: Colors.colors.cyan[100],
        padding: 8,
        borderRadius: 5,
        borderWidth: 0.1,
    },
    attributesTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.text.primary,
        textAlign: "center",
    },
    attributeRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 4,
    },
    attributeSlNo: {
        fontSize: 14,
        fontWeight: "600",
        color: Colors.text.secondary,
        marginRight: 6,
    },
    attributeKey: {
        fontSize: 14,
        fontWeight: "600",
        textTransform: "capitalize",
        flex: 1,
    },
    attributeValue: {
        fontSize: 14,
        color: Colors.primary,
        flex: 1,
        textAlign: "right",
    },
    metaText: {
        fontSize: 14,
        color: Colors.text.secondary,
        marginTop: 8,
    },
});

import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "@/src/utils/Colors";

interface ProductActionsProps {
    onAddToCart: () => void;
    onBuyNow: () => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({ onAddToCart, onBuyNow }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addToCart} onPress={onAddToCart}>
                <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buyNow} onPress={onBuyNow}>
                <Text style={styles.buttonText}>Buy Now</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: Colors.background.light,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    addToCart: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
        marginRight: 8,
    },
    buyNow: {
        flex: 1,
        backgroundColor: Colors.status.success,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.text.white,
    },
});

export default ProductActions;

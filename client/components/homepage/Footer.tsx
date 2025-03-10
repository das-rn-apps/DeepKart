import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "@/src/utils/Colors";

export default function Footer() {
    return (
        <View style={styles.footer}>
            {/* Top Links Section */}
            <View style={styles.linkSection}>
                <View style={styles.linkColumn}>
                    <Text style={styles.linkHeader}>Quick Links</Text>
                    <TouchableOpacity><Text style={styles.link}>Home</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.link}>Categories</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.link}>My Orders</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.link}>Wishlist</Text></TouchableOpacity>
                </View>

                <View style={styles.linkColumn}>
                    <Text style={styles.linkHeader}>Help</Text>
                    <TouchableOpacity><Text style={styles.link}>Customer Support</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.link}>FAQs</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.link}>Return Policy</Text></TouchableOpacity>
                </View>

                <View style={styles.linkColumn}>
                    <Text style={styles.linkHeader}>Policies</Text>
                    <TouchableOpacity><Text style={styles.link}>Privacy Policy</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.link}>Terms of Use</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.link}>Shipping Policy</Text></TouchableOpacity>
                </View>
            </View>

            {/* Social Media Section */}
            <View style={styles.socialSection}>
                <Text style={styles.socialHeader}>Follow Us</Text>
                <View style={styles.socialIcons}>
                    <TouchableOpacity>
                        <FontAwesome name="facebook" size={20} color={Colors.text.white} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name="instagram" size={20} color={Colors.text.white} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name="twitter" size={20} color={Colors.text.white} style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FontAwesome name="youtube" size={20} color={Colors.text.white} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
                <Text style={styles.copyright}>© 2025 YourApp. All Rights Reserved.</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: Colors.background.dark,
        paddingVertical: 20,
        paddingHorizontal: 15,
        paddingBottom: 30
    },
    linkSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    linkColumn: {
        flex: 1,
    },
    linkHeader: {
        fontSize: 14,
        fontWeight: "bold",
        color: Colors.text.white,
        marginBottom: 8,
    },
    link: {
        fontSize: 12,
        color: Colors.text.white,
        marginBottom: 5,
    },
    socialSection: {
        alignItems: "center",
        marginBottom: 15,
    },
    socialHeader: {
        fontSize: 14,
        fontWeight: "bold",
        color: Colors.text.white,
        marginBottom: 10,
    },
    socialIcons: {
        flexDirection: "row",
        gap: 12,
    },
    icon: {
        padding: 8,
    },
    bottomSection: {
        borderTopWidth: 1,
        borderTopColor: Colors.border,
        paddingTop: 10,
        alignItems: "center",
    },
    copyright: {
        fontSize: 12,
        color: Colors.text.secondary,
    },
});


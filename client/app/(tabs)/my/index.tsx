import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link, useRouter } from "expo-router";
import { Colors } from "@/src/utils/Colors";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
    const router = useRouter();

    const handleLogout = async () => {
        await AsyncStorage.removeItem("authToken");
        console.log("User logged out");
        router.replace("/login");
    };

    return (
        <View style={styles.container}>
            {/* User Info Card */}
            <View style={styles.profileCard}>
                <FontAwesome name="user-circle" size={80} color={Colors.primary} style={styles.avatar} />
                <Text style={styles.userName}>John Doe</Text>
                <Text style={styles.userEmail}>johndoe@example.com</Text>
            </View>

            {/* Profile Actions */}
            <View style={styles.menu}>
                <MenuItem icon="edit" text="Update Profile" link="/profile" />
                <MenuItem icon="shopping-bag" text="My Orders" link="/profile" />
                <MenuItem icon="map-marker" text="Saved Addresses" link="/profile/addresses" />
                <MenuItem icon="cog" text="Settings" link="/profile" />
            </View>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <FontAwesome name="sign-out" size={20} color={Colors.text.white} />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

// Menu Item Component for Reusability
const MenuItem = ({ icon, text, link }: { icon: string; text: string; link: string }) => (
    <Link href={link as any} asChild>
        <TouchableOpacity style={styles.menuItem}>
            <FontAwesome name={icon as any} size={20} color={Colors.icon.active} />
            <Text style={styles.menuText}>{text}</Text>
        </TouchableOpacity>
    </Link>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background.light,
        padding: 20,
        alignItems: "center",
    },
    profileCard: {
        width: "100%",
        alignItems: "center",
        backgroundColor: Colors.background.dark,
        paddingVertical: 30,
        borderRadius: 15,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        marginBottom: 20,
    },
    avatar: {
        marginBottom: 10,
    },
    userName: {
        fontSize: 22,
        fontWeight: "bold",
        color: Colors.text.white,
        marginTop: 5,
    },
    userEmail: {
        fontSize: 14,
        color: Colors.text.secondary,
    },
    menu: {
        width: "100%",
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: Colors.background.light,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 2,
    },
    menuText: {
        fontSize: 18,
        color: Colors.text.primary,
        marginLeft: 15,
        fontWeight: "500",
    },
    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 30,
        paddingVertical: 14,
        paddingHorizontal: 30,
        backgroundColor: Colors.status.error,
        borderRadius: 10,
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 5,
    },
    logoutText: {
        fontSize: 18,
        color: Colors.text.white,
        marginLeft: 12,
        fontWeight: "bold",
    },
});


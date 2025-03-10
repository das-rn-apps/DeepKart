import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Colors } from "@/src/utils/Colors";
import { Feather } from "@expo/vector-icons";

export default function SearchBar() {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        console.log("Searching for:", query);
        // Add search logic here
    };

    return (
        <View style={styles.searchBarContainer}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search for products, brands..."
                placeholderTextColor={Colors.text.secondary}
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearch}
                onFocus={() => console.log("Search focused")}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch} activeOpacity={0.7}>
                <Feather name="search" size={22} color={Colors.background.light} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    searchBarContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        margin: 10
    },
    searchBar: {
        flex: 1,
        height: 45,
        paddingHorizontal: 12,
        backgroundColor: Colors.colors.indigo[200],
        borderRadius: 15,
        fontSize: 16,
        color: Colors.text.primary,
    },
    searchButton: {
        backgroundColor: Colors.colors.blue[400],
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 8,
        height: 45,
        width: 45
    },
});


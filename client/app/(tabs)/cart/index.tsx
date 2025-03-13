import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import Header from '@/components/homepage/Header';
import Footer from '@/components/homepage/Footer';
import { Colors } from '@/src/utils/Colors';
import Cart from '@/components/cart/Cart';

interface CartScreenItem {
    type: 'header' | 'cartItem' | 'footer';
}

const CartScreen: React.FC = () => {
    const data: CartScreenItem[] = [
        { type: 'header' },
        { type: 'cartItem' },
        { type: 'footer' },
    ];

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => {
                switch (item.type) {
                    case 'header': return <Header />;
                    case 'cartItem': return <Cart />;
                    case 'footer': return <Footer />;
                    default: return null;
                }
            }}
            keyExtractor={(_, index) => index.toString()}
            style={styles.container}
            contentContainerStyle={styles.flatListContent}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.colors.red[100],
    },
    flatListContent: {
        flexGrow: 1,
    },
});

export default CartScreen;
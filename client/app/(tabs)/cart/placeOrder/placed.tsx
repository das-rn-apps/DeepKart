import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Colors } from '@/src/utils/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    Easing,
} from 'react-native-reanimated';

const OrderSuccessScreen = () => {
    const iconScale = useSharedValue(0);
    const messageOpacity = useSharedValue(0);

    useEffect(() => {
        let soundObject = new Audio.Sound();

        const playSound = async () => {
            try {
                await soundObject.loadAsync(require('@/src/utils/orderPlaced.mp3')); // Replace with your sound file path
                await soundObject.playAsync();
            } catch (error) {
                console.error('Failed to play sound', error);
            }
        };

        playSound();

        iconScale.value = withSpring(1, { damping: 3, stiffness: 100 });
        messageOpacity.value = withTiming(1, { duration: 1000, easing: Easing.ease });

        return () => {
            soundObject.unloadAsync();
        };
    }, []);

    const iconAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: iconScale.value }],
        };
    });

    const messageAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: messageOpacity.value,
        };
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient
                colors={[Colors.colors.green[100], Colors.colors.green[200]]}
                style={styles.gradientBackground}
            >
                <View style={styles.container}>
                    <Animated.View style={[styles.successIconContainer, iconAnimatedStyle]}>
                        <MaterialIcons name="check-circle" size={100} color={Colors.status.success} />
                    </Animated.View>

                    <Animated.View style={messageAnimatedStyle}>
                        <Text style={styles.successMessage}>Order Placed Successfully!</Text>
                    </Animated.View>

                    <Text style={styles.orderDetailText}>
                        Your order has been placed. You can track it in your order history.
                    </Text>

                    <TouchableOpacity onPress={() => router.replace('/myOrders')}>
                        <Text style={styles.trackOrderLink}>Track Order</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.continueShoppingButton}
                        onPress={() => router.replace('/(tabs)/home')}
                    >
                        <Text style={styles.continueShoppingText}>Continue Shopping</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    gradientBackground: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    successIconContainer: {
        marginBottom: 30,
        shadowColor: Colors.colors.green[600],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    successMessage: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.status.success,
        marginBottom: 16,
        textAlign: 'center',
    },
    orderDetailText: {
        fontSize: 16,
        color: Colors.text.secondary,
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 24,
    },
    trackOrderLink: {
        color: Colors.colors.blue[500],
        fontSize: 16,
        fontWeight: '500',
        textDecorationLine: 'underline',
        marginBottom: 30,
    },
    continueShoppingButton: {
        backgroundColor: Colors.status.success,
        paddingVertical: 16,
        paddingHorizontal: 40,
        borderRadius: 30,
        shadowColor: Colors.colors.green[600],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    continueShoppingText: {
        color: Colors.text.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default OrderSuccessScreen;
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Colors } from '@/src/utils/Colors';
import { MaterialIcons } from '@expo/vector-icons';

const PaymentMethodSection = () => {
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');

    const initiatePayment = () => {
        const upiId = '9128753899@ybl';
        const payeeName = 'Deepak Das';
        const amount = '1.00';
        const currency = 'INR';
        const transactionId = `TXN-${Date.now()}`;

        const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=${currency}&tr=${transactionId}`;

        Linking.openURL(upiLink).catch((err) => {
            console.error('An error occurred', err);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payment Method</Text>
            <View style={styles.paymentMethodContainer}>
                {/* Credit Card */}
                <TouchableOpacity
                    style={[
                        styles.paymentMethodButton,
                        paymentMethod === 'Credit Card' && styles.selectedPaymentMethod,
                    ]}
                    onPress={() => setPaymentMethod('Credit Card')}
                >
                    <MaterialIcons name="credit-card" size={24} color={Colors.colors.gray[600]} />
                    <Text style={styles.paymentMethodText}>Credit Card</Text>
                </TouchableOpacity>

                {/* PayPal */}
                <TouchableOpacity
                    style={[
                        styles.paymentMethodButton,
                        paymentMethod === 'PayPal' && styles.selectedPaymentMethod,
                    ]}
                    onPress={() => setPaymentMethod('PayPal')}
                >
                    <MaterialIcons name="paypal" size={24} color={Colors.colors.gray[600]} />
                    <Text style={styles.paymentMethodText}>PayPal</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.paymentMethodContainer}>
                {/* UPI */}
                <TouchableOpacity
                    style={[
                        styles.paymentMethodButton,
                        paymentMethod === 'UPI' && styles.selectedPaymentMethod,
                    ]}
                    onPress={() => { setPaymentMethod('UPI'); initiatePayment() }}
                >
                    <MaterialIcons name="account-balance-wallet" size={24} color={Colors.colors.gray[600]} />
                    <Text style={styles.paymentMethodText}>UPI</Text>
                </TouchableOpacity>

                {/* Net Banking */}
                <TouchableOpacity
                    style={[
                        styles.paymentMethodButton,
                        paymentMethod === 'Net Banking' && styles.selectedPaymentMethod,
                    ]}
                    onPress={() => setPaymentMethod('Net Banking')}
                >
                    <MaterialIcons name="account-balance" size={24} color={Colors.colors.gray[600]} />
                    <Text style={styles.paymentMethodText}>Net Banking</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.paymentMethodContainer}>
                {/* Wallet */}
                <TouchableOpacity
                    style={[
                        styles.paymentMethodButton,
                        paymentMethod === 'Wallet' && styles.selectedPaymentMethod,
                    ]}
                    onPress={() => setPaymentMethod('Wallet')}
                >
                    <MaterialIcons name="wallet" size={24} color={Colors.colors.gray[600]} />
                    <Text style={styles.paymentMethodText}>Wallet</Text>
                </TouchableOpacity>
                {/* UPI */}
                <TouchableOpacity
                    style={[
                        styles.paymentMethodButton,
                        paymentMethod === 'COD' && styles.selectedPaymentMethod,
                    ]}
                    onPress={() => setPaymentMethod('COD')}
                >
                    <MaterialIcons name="money" size={24} color={Colors.colors.gray[600]} />
                    <Text style={styles.paymentMethodText}>COD</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: Colors.colors.gray[200],
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.colors.gray[600],
        marginBottom: 16,
    },
    paymentMethodContainer: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 16,
    },
    paymentMethodButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.background.light,
        borderWidth: 1,
        borderColor: Colors.colors.gray[200],
        borderRadius: 8,
        padding: 16,
        gap: 8,
    },
    selectedPaymentMethod: {
        borderColor: Colors.colors.blue[500],
        backgroundColor: Colors.colors.blue[100],
    },
    paymentMethodText: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.colors.gray[600],
    },
});

export default PaymentMethodSection;
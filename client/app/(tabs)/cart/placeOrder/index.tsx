import React from 'react';
import { FlatList } from 'react-native';
import Footer from '@/components/homepage/Footer';
import OrderSection from '@/components/order/OrderSection';
import ShippingAddressSection from '@/components/order/ShippingAddressSection';
import PaymentMethodSection from '@/components/order/PaymentMethodSection';
import ConfirmPlacing from '@/components/order/ConfirmPlacing';


const OrderPlacingPage = () => {

    const data = [
        { type: 'orderDetails' },
        { type: 'shippingAddress' },
        { type: 'paymentMethod' },
        { type: 'confirmSection' },
        { type: 'footer' },
    ];

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => {
                switch (item.type) {
                    case 'orderDetails':
                        return <OrderSection />;
                    case 'shippingAddress':
                        return <ShippingAddressSection />;
                    case 'paymentMethod':
                        return <PaymentMethodSection />;
                    case 'confirmSection':
                        return <ConfirmPlacing />;
                    case 'footer':
                        return <Footer />;
                    default:
                        return null;
                }
            }}
            keyExtractor={(_, index) => index.toString()}
        />
    );
};

export default OrderPlacingPage;
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, Animated, Dimensions } from 'react-native';
import { Colors } from '@/src/utils/Colors';
import { getAddresses } from '@/src/services/user';
import { IAddress } from '@/src/utils/types';
import { MaterialIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const ShippingAddressSection = () => {
    const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
    const [addresses, setAddresses] = useState<IAddress[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [animation] = useState(new Animated.Value(0));

    useEffect(() => {
        const fetchAddresses = async () => {
            const data = await getAddresses();
            setAddresses(data);
            const defaultAddress = data.find((address: IAddress) => address.isDefault);
            if (defaultAddress) setSelectedAddress(defaultAddress);
        };
        fetchAddresses();
    }, []);

    useEffect(() => {
        Animated.timing(animation, {
            toValue: isModalVisible ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isModalVisible]);

    const handleAddressSelect = (address: IAddress) => {
        setSelectedAddress(address);
        setIsModalVisible(false);
    };

    const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [height, height * 0.3],
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Shipping Address</Text>
            <TouchableOpacity style={styles.dropdownTrigger} onPress={() => setIsModalVisible(true)}>
                <Text style={styles.selectedAddressText}>
                    {selectedAddress ? selectedAddress.addressLine1 : 'Select an address'}
                </Text>
                <MaterialIcons name="arrow-drop-down" size={24} color={Colors.colors.gray[600]} />
            </TouchableOpacity>

            <Modal visible={isModalVisible} animationType="none" transparent onRequestClose={() => setIsModalVisible(false)}>
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setIsModalVisible(false)} // Close modal when pressed outside
                >
                    <Animated.View style={[styles.bottomSheet, { transform: [{ translateY }] }]}>
                        <Text style={styles.modalTitle}>Select Address</Text>
                        <FlatList
                            data={addresses}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[styles.addressCard, selectedAddress?._id === item._id && styles.selectedAddressCard]}
                                    onPress={() => handleAddressSelect(item)}
                                >
                                    <Text style={styles.addressText}>{item.addressLine1}</Text>
                                    {item.addressLine2 && <Text style={styles.addressText}>{item.addressLine2}</Text>}
                                    <Text style={styles.addressText}>{item.city}, {item.state}, {item.postalCode}</Text>
                                    {item.isDefault && <Text style={styles.defaultAddressText}>Default</Text>}
                                </TouchableOpacity>
                            )}
                        />
                        <TouchableOpacity style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 16, borderBottomWidth: 1, borderBottomColor: Colors.colors.gray[200] },
    title: { fontSize: 20, fontWeight: 'bold', color: Colors.colors.gray[600], marginBottom: 16 },
    dropdownTrigger: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: Colors.background.light, borderWidth: 1, borderColor: Colors.colors.gray[200],
        borderRadius: 8, padding: 12,
    },
    selectedAddressText: { fontSize: 16, color: Colors.colors.gray[600] },
    modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.411)' },
    bottomSheet: {
        width: '100%', backgroundColor: Colors.background.light, borderTopLeftRadius: 16, borderTopRightRadius: 16,
        padding: 16, maxHeight: height * 0.9,
    },
    modalTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.colors.gray[600], marginBottom: 16 },
    addressCard: {
        backgroundColor: Colors.background.light, borderRadius: 8, padding: 16, marginBottom: 12,
        borderWidth: 1, borderColor: Colors.colors.gray[200],
    },
    selectedAddressCard: { borderColor: Colors.colors.green[500], backgroundColor: Colors.colors.green[100] },
    addressText: { fontSize: 16, color: Colors.colors.gray[600] },
    defaultAddressText: { fontSize: 14, color: Colors.colors.green[500], fontWeight: 'bold', marginTop: 8 },
    closeButton: { marginTop: 16, padding: 12, backgroundColor: Colors.colors.gray[200], borderRadius: 8, alignItems: 'center' },
    closeButtonText: { fontSize: 16, color: Colors.colors.gray[600], fontWeight: 'bold' },
});

export default ShippingAddressSection;
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/src/utils/Colors';
import { loginUser } from '@/src/services/auth';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const data = await loginUser(email, password);
            await AsyncStorage.setItem('authToken', data.token);
            router.replace('/home');
        } catch (error: any) {
            Alert.alert('Login Failed', error.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const fillDefaultUser = () => {
        setEmail("user2@gmail.com");
        setPassword("Qwertyuiop");
    };

    return (
        <LinearGradient colors={['rgba(0, 0, 0, 0.651)', 'rgba(155, 246, 135, 0.547)']} style={styles.overlay}>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome Back 👋</Text>
                <TextInput style={styles.input} placeholder="Email" placeholderTextColor={Colors.text.secondary} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                <TextInput style={styles.input} placeholder="Password" placeholderTextColor={Colors.text.secondary} value={password} onChangeText={setPassword} secureTextEntry />
                <TouchableOpacity onPress={handleLogin} style={styles.button} disabled={loading}>
                    <LinearGradient colors={[Colors.primary, Colors.accent]} style={styles.gradientButton}>
                        {loading ? <ActivityIndicator color={Colors.text.white} /> : <Text style={styles.buttonText}>Login</Text>}
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/register')}>
                    <Text style={styles.registerText}>Don't have an account? <Text style={styles.registerLink}>Sign Up</Text></Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={fillDefaultUser} style={styles.defaultUserButton}>
                    <Text style={styles.defaultUserText}>Use Default User</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    overlay: { flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' },
    container: { width: '90%', padding: 20, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.15)' },
    title: { fontSize: 24, fontWeight: 'bold', color: Colors.text.white, textAlign: 'center', marginBottom: 20 },
    input: { height: 50, backgroundColor: 'rgba(255, 255, 255, 0.393)', borderRadius: 10, paddingHorizontal: 15, marginBottom: 15, fontSize: 16, color: Colors.text.white },
    button: { borderRadius: 10, overflow: 'hidden', marginBottom: 15 },
    gradientButton: { paddingVertical: 15, alignItems: 'center', borderRadius: 10 },
    buttonText: { color: Colors.text.white, fontSize: 18, fontWeight: 'bold' },
    registerText: { textAlign: 'center', fontSize: 14, color: Colors.text.white },
    registerLink: { color: Colors.accent, fontWeight: 'bold', fontSize: 15 },
    defaultUserButton: { marginTop: 10, padding: 10, borderRadius: 10, backgroundColor: 'rgba(255, 255, 255, 0.2)', alignItems: 'center' },
    defaultUserText: { color: Colors.text.white, fontSize: 14 },
});
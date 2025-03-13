import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    ImageBackground,
    StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/src/utils/Colors';
import { loginUser } from '@/src/services/auth';

export default function LoginScreen() {
    const [email, setEmail] = useState('user2@gmail.com');
    const [password, setPassword] = useState('Qwertyuiop');
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

    return (
        <ImageBackground source={require('@/src/pngs/das.png')} style={styles.background}>
            <LinearGradient colors={['rgba(0, 0, 0, 0.651)', 'rgba(125, 246, 97, 0.8)']} style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Welcome Back 👋</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor={Colors.text.secondary}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor={Colors.text.secondary}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity onPress={handleLogin} style={styles.button} disabled={loading}>
                        <LinearGradient colors={[Colors.primary, Colors.accent]} style={styles.gradientButton}>
                            {loading ? <ActivityIndicator color={Colors.text.white} /> : <Text style={styles.buttonText}>Login</Text>}
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push('/register')}>
                        <Text style={styles.registerText}>
                            Don't have an account? <Text style={styles.registerLink}>Sign Up</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    overlay: { flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' },
    container: { width: '90%', padding: 20, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.15)' },
    title: { fontSize: 24, fontWeight: 'bold', color: Colors.text.white, textAlign: 'center', marginBottom: 20 },
    input: { height: 50, backgroundColor: 'rgba(255, 255, 255, 0.393)', borderRadius: 10, paddingHorizontal: 15, marginBottom: 15, fontSize: 16, color: Colors.text.white },
    button: { borderRadius: 10, overflow: 'hidden', marginBottom: 15 },
    gradientButton: { paddingVertical: 15, alignItems: 'center', borderRadius: 10 },
    buttonText: { color: Colors.text.white, fontSize: 18, fontWeight: 'bold' },
    registerText: { textAlign: 'center', fontSize: 14, color: Colors.text.white },
    registerLink: { color: Colors.accent, fontWeight: 'bold', fontSize: 15 },
});

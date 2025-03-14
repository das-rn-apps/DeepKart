import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/src/utils/Colors';
import { registerUser } from '@/src/services/auth';

export default function RegisterScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async () => {
        setLoading(true);
        try {
            await registerUser(username, email, password, firstName, lastName, phoneNumber);
            router.push('/login');
        } catch (error: any) {
            Alert.alert('Registration Failed', error.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const fillFakeUser = () => {
        setUsername('fakeuser');
        setEmail('fakeuser@example.com');
        setPassword('Qwertyuiop');
        setFirstName('Fake');
        setLastName('User');
        setPhoneNumber('1234567890');
    };

    return (
        <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(62, 52, 255, 0.8)']} style={styles.overlay}>
            <View style={styles.container}>
                <Text style={styles.title}>Create Account</Text>
                <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
                <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
                <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
                <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
                <TextInput style={styles.input} placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" />
                <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
                    <LinearGradient colors={[Colors.primary, Colors.accent]} style={styles.gradientButton}>
                        {loading ? <ActivityIndicator color={Colors.text.white} /> : <Text style={styles.buttonText}>Register</Text>}
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={fillFakeUser}>
                    <Text style={styles.fakeUserText}>Fill Fake User</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/login')}>
                    <Text style={styles.loginText}>Already have an account? <Text style={styles.loginLink}>Login</Text></Text>
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
    loginText: { textAlign: 'center', fontSize: 14, color: Colors.text.white },
    loginLink: { color: Colors.accent, fontWeight: 'bold', fontSize: 15 },
    fakeUserText: { textAlign: 'center', fontSize: 14, color: Colors.accent, marginBottom: 10 },
});
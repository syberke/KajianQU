import { useAuth } from '@/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, ChevronDown, Lock, Mail, Sparkles, User, UserCircle } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    Platform,
    StatusBar
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const roles = [
    { value: 'user', label: 'Jamaah / User' },
    { value: 'asatidz', label: 'Ustadz / Asatidz' },
];

export default function RegisterScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('user');
    const [showRoleDropdown, setShowRoleDropdown] = useState(false);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { signUp } = useAuth();
    const insets = useSafeAreaInsets();

    const handleSignUp = async () => {
        if (!email || !password || !name) {
            Alert.alert('Data Belum Lengkap', 'Mohon lengkapi semua data pendaftaran ya.');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Keamanan', 'Password minimal harus 6 karakter.');
            return;
        }

        setLoading(true);
        const { error } = await signUp(email, password, name, role);

        if (error) {
            Alert.alert('Gagal Daftar', error);
        } else {
            Alert.alert('Alhamdulillah!', 'Akun berhasil dibuat. Silakan masuk. jangan lupa verifikasi di gmail', [
                { text: 'Masuk Sekarang', onPress: () => router.replace('/login') }
            ]);
        }
        setLoading(false);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient colors={['#065F46', '#064E3B', '#022C22']} style={styles.gradient} />

            {/* Ornaments */}
            <View style={[styles.circle, { top: -40, left: -60, backgroundColor: '#3B82F6', opacity: 0.15 }]} />
            <View style={[styles.circle, { bottom: -100, right: -80, backgroundColor: '#10B981', opacity: 0.1 }]} />

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                    <View style={[styles.content, { paddingTop: insets.top + 10 }]}>

                        <Pressable style={styles.backButton} onPress={() => router.back()}>
                            <ArrowLeft size={22} color="#A7F3D0" />
                        </Pressable>

                        <Animated.View entering={FadeInUp.delay(200)} style={styles.header}>
                            <View style={styles.iconBadge}>
                                <UserCircle size={28} color="#10B981" />
                            </View>
                            <Text style={styles.title}>Daftar Akun</Text>
                            <Text style={styles.subtitle}>Bergabunglah dengan komunitas KajianQU.</Text>
                        </Animated.View>

                        <Animated.View entering={FadeInDown.delay(400)} style={styles.card}>

                            {/* Input Nama */}
                            <View style={styles.inputWrapper}>
                                <Text style={styles.inputLabel}>Nama Lengkap</Text>
                                <View style={[styles.inputContainer, focusedInput === 'name' && styles.inputFocused]}>
                                    <User size={20} color={focusedInput === 'name' ? '#10B981' : '#9CA3AF'} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Masukkan nama lengkap"
                                        onFocus={() => setFocusedInput('name')}
                                        onBlur={() => setFocusedInput(null)}
                                        value={name}
                                        onChangeText={setName}
                                    />
                                </View>
                            </View>

                            {/* Input Email */}
                            <View style={styles.inputWrapper}>
                                <Text style={styles.inputLabel}>Email</Text>
                                <View style={[styles.inputContainer, focusedInput === 'email' && styles.inputFocused]}>
                                    <Mail size={20} color={focusedInput === 'email' ? '#10B981' : '#9CA3AF'} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="name@email.com"
                                        onFocus={() => setFocusedInput('email')}
                                        onBlur={() => setFocusedInput(null)}
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>
                            </View>

                            {/* Input Password */}
                            <View style={styles.inputWrapper}>
                                <Text style={styles.inputLabel}>Password</Text>
                                <View style={[styles.inputContainer, focusedInput === 'pass' && styles.inputFocused]}>
                                    <Lock size={20} color={focusedInput === 'pass' ? '#10B981' : '#9CA3AF'} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Min. 6 karakter"
                                        onFocus={() => setFocusedInput('pass')}
                                        onBlur={() => setFocusedInput(null)}
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry
                                    />
                                </View>
                            </View>

                            {/* Role Dropdown */}
                            <View style={styles.inputWrapper}>
                                <Text style={styles.inputLabel}>Daftar Sebagai</Text>
                                <Pressable
                                    style={styles.dropdown}
                                    onPress={() => setShowRoleDropdown(!showRoleDropdown)}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Sparkles size={20} color="#10B981" style={{ marginRight: 12 }} />
                                        <Text style={styles.dropdownText}>
                                            {roles.find(r => r.value === role)?.label}
                                        </Text>
                                    </View>
                                    <ChevronDown size={20} color="#9CA3AF" />
                                </Pressable>

                                {showRoleDropdown && (
                                    <View style={styles.dropdownOptions}>
                                        {roles.map((item) => (
                                            <Pressable
                                                key={item.value}
                                                style={styles.option}
                                                onPress={() => {
                                                    setRole(item.value);
                                                    setShowRoleDropdown(false);
                                                }}
                                            >
                                                <Text style={[styles.optionText, role === item.value && { color: '#10B981', fontWeight: 'bold' }]}>
                                                    {item.label}
                                                </Text>
                                            </Pressable>
                                        ))}
                                    </View>
                                )}
                            </View>

                            <Pressable
                                style={({ pressed }) => [styles.button, (loading || pressed) && styles.buttonPressed]}
                                onPress={handleSignUp}
                                disabled={loading}
                            >
                                <Text style={styles.buttonText}>{loading ? 'Membuat Akun...' : 'Daftar Sekarang'}</Text>
                            </Pressable>

                            <View style={styles.footer}>
                                <Text style={styles.footerText}>Sudah punya akun? </Text>
                                <Pressable onPress={() => router.push('/login')}>
                                    <Text style={styles.footerLink}>Masuk</Text>
                                </Pressable>
                            </View>

                        </Animated.View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#022C22' },
    gradient: { ...StyleSheet.absoluteFillObject },
    circle: { position: 'absolute', width: 220, height: 220, borderRadius: 110 },
    content: { flex: 1, paddingHorizontal: 28 },
    backButton: {
        width: 44, height: 44, borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.08)',
        alignItems: 'center', justifyContent: 'center',
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    },
    header: { marginTop: 30, marginBottom: 30 },
    iconBadge: {
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        width: 56, height: 56, borderRadius: 16,
        alignItems: 'center', justifyContent: 'center', marginBottom: 20,
    },
    title: { fontSize: 28, fontWeight: '800', color: 'white', letterSpacing: -0.5 },
    subtitle: { fontSize: 15, color: '#A7F3D0', marginTop: 8, opacity: 0.8 },
    card: {
        backgroundColor: 'white', borderRadius: 32, padding: 25,
        shadowColor: '#000', shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.2, shadowRadius: 40, elevation: 10,
    },
    inputWrapper: { marginBottom: 16 },
    inputLabel: {
        fontSize: 12, fontWeight: '700', color: '#4B5563',
        marginBottom: 8, marginLeft: 4, textTransform: 'uppercase', letterSpacing: 0.5,
    },
    inputContainer: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6',
        borderRadius: 16, paddingHorizontal: 16, height: 56, borderWidth: 1.5, borderColor: '#F3F4F6',
    },
    inputFocused: { backgroundColor: 'white', borderColor: '#10B981' },
    input: { flex: 1, marginLeft: 12, fontSize: 15, color: '#111827' },
    dropdown: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: '#F3F4F6', borderRadius: 16, paddingHorizontal: 16, height: 56,
    },
    dropdownText: { fontSize: 15, color: '#111827', fontWeight: '500' },
    dropdownOptions: {
        backgroundColor: 'white', borderRadius: 16, marginTop: 8, padding: 8,
        borderWidth: 1, borderColor: '#E5E7EB',
    },
    option: { padding: 12, borderRadius: 10 },
    optionText: { fontSize: 14, color: '#374151' },
    button: {
        backgroundColor: '#111827', height: 60, borderRadius: 18,
        alignItems: 'center', justifyContent: 'center', marginTop: 10,
    },
    buttonPressed: { opacity: 0.9, transform: [{ scale: 0.98 }] },
    buttonText: { color: 'white', fontSize: 16, fontWeight: '700' },
    footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
    footerText: { color: '#6B7280', fontSize: 14 },
    footerLink: { color: '#10B981', fontWeight: '700' },
});
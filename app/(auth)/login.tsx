import { useAuth } from '@/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowLeft, KeyRound, Mail, Sparkles } from 'lucide-react-native';
import React, { useState } from 'react';
import { 
  Alert, 
  Dimensions, 
  Pressable, 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  KeyboardAvoidingView, 
  Platform,
  StatusBar
} from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  
  const { signIn, refreshProfile } = useAuth();

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Eits!', 'Isi email dan password-mu dulu ya.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        Alert.alert('Gagal Masuk', error);
      } else {
        if (refreshProfile) await refreshProfile();
        router.replace('/(tabs)');
      }
    } catch (e) {
      Alert.alert('Error', 'Sistem sedang sibuk, coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
     
      <LinearGradient
        colors={['#065F46', '#064E3B', '#022C22']}
        style={styles.gradient}
      />
      
     
      <View style={[styles.circle, { top: -50, right: -50, backgroundColor: '#10B981', opacity: 0.2 }]} />
      <View style={[styles.circle, { bottom: 100, left: -80, backgroundColor: '#3B82F6', opacity: 0.1 }]} />

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={[styles.content, { paddingTop: insets.top + 10 }]}>
          
           <Pressable 
            style={styles.backButton}
            onPress={() => router.push('/(auth)/welcome')}
          >
            <ArrowLeft size={22} color="#A7F3D0" />
          </Pressable>

          <Animated.View entering={FadeInUp.delay(200)} style={styles.header}>
            <View style={styles.iconBadge}>
              <Sparkles size={24} color="#10B981" />
            </View>
            <Text style={styles.title}>Selamat Datang Kembali</Text>
            <Text style={styles.subtitle}>Eksplorasi ilmu tanpa batas dimulai dari sini.</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(400)} style={styles.card}>
            
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={[
                styles.inputContainer, 
                focusedInput === 'email' && styles.inputFocused
              ]}>
                <Mail size={20} color={focusedInput === 'email' ? '#10B981' : '#9CA3AF'} />
                <TextInput
                  style={styles.input}
                  placeholder="name@example.com"
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            <View style={styles.inputWrapper}>
              <View style={styles.labelRow}>
                <Text style={styles.inputLabel}>Password</Text>
                <Pressable><Text style={styles.forgotText}>Lupa?</Text></Pressable>
              </View>
              <View style={[
                styles.inputContainer,
                focusedInput === 'password' && styles.inputFocused
              ]}>
                <KeyRound size={20} color={focusedInput === 'password' ? '#10B981' : '#9CA3AF'} />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.button,
                (loading || pressed) && styles.buttonPressed
              ]}
              onPress={handleSignIn}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Menghubungkan...' : 'Masuk Sekarang'}
              </Text>
            </Pressable>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Belum punya akun? </Text>
              <Pressable onPress={() => router.push('/register')}>
                <Text style={styles.footerLink}>Daftar Gratis</Text>
              </Pressable>
            </View>

          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#022C22',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  circle: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
  },
  iconBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: 'white',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#A7F3D0',
    marginTop: 8,
    lineHeight: 22,
    opacity: 0.8,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 32,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 10,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 58,
    borderWidth: 1.5,
    borderColor: '#F3F4F6',
  },
  inputFocused: {
    backgroundColor: 'white',
    borderColor: '#10B981',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  forgotText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#111827', 
    height: 60,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#6B7280',
    fontSize: 14,
  },
  footerLink: {
    color: '#10B981',
    fontWeight: '700',
    fontSize: 14,
  },
});
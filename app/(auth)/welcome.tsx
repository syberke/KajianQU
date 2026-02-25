import React from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions, ScrollView, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BookOpen, Users, Award, Sparkles, ChevronRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInUp, FadeIn } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      
      <LinearGradient
        colors={['#065F46', '#064E3B', '#022C22']}
        style={styles.gradient}
      />

     
      <View style={[styles.circle, { top: -50, right: -50, backgroundColor: '#10B981', opacity: 0.2 }]} />
      <View style={[styles.circle, { bottom: -80, left: -80, backgroundColor: '#3B82F6', opacity: 0.1 }]} />

      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Animated.View entering={FadeIn.delay(200)} style={styles.logoBadge}>
            <BookOpen size={40} color="#10B981" strokeWidth={2.5} />
          </Animated.View>
          
          <Animated.Text entering={FadeInUp.delay(400)} style={styles.title}>
            Kajian<Text style={{ color: '#10B981' }}>Qu</Text>
          </Animated.Text>
          
          <Animated.Text entering={FadeInUp.delay(500)} style={styles.subtitle}>
            Platform digital terintegrasi untuk memperdalam ilmu agama dan mempererat silaturahmi umat.
          </Animated.Text>
        </View>

   
        <View style={styles.featuresContainer}>
          <Animated.View entering={FadeInDown.delay(600)} style={styles.featureCard}>
            <View style={styles.iconContainer}>
              <Sparkles size={22} color="white" />
            </View>
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>Kajian Eksklusif</Text>
              <Text style={styles.featureDesc}>Akses berbagai video kajian pilihan.</Text>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(700)} style={styles.featureCard}>
            <View style={[styles.iconContainer, { backgroundColor: '#3B82F6' }]}>
              <Users size={22} color="white" />
            </View>
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>Komunitas Asatidz</Text>
              <Text style={styles.featureDesc}>Terhubung langsung dengan para guru.</Text>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(800)} style={styles.featureCard}>
            <View style={[styles.iconContainer, { backgroundColor: '#F59E0B' }]}>
              <Award size={22} color="white" />
            </View>
            <View style={styles.featureInfo}>
              <Text style={styles.featureTitle}>Program Sertifikasi</Text>
              <Text style={styles.featureDesc}>Uji pemahaman dan dapatkan apresiasi.</Text>
            </View>
          </Animated.View>
        </View>

      
        <Animated.View entering={FadeInDown.delay(1000)} style={styles.footer}>
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && { opacity: 0.9, transform: [{ scale: 0.98 }] }
            ]}
            onPress={() => router.push('/(auth)/login')}
          >
            <Text style={styles.primaryButtonText}>Mulai Belajar</Text>
            <ChevronRight size={20} color="#064E3B" />
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && { backgroundColor: 'rgba(255,255,255,0.1)' }
            ]}
            onPress={() => router.push('/(auth)/register')}
          >
            <Text style={styles.secondaryButtonText}>Belum punya akun? Daftar</Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
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
    width: 280,
    height: 280,
    borderRadius: 140,
  },
  content: {
    minHeight: height,
    paddingHorizontal: 28,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoBadge: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: 'white',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: '#A7F3D0',
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 24,
    marginTop: 12,
    paddingHorizontal: 10,
  },
  featuresContainer: {
    gap: 16,
    marginBottom: 50,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureInfo: {
    marginLeft: 16,
    flex: 1,
  },
  featureTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  featureDesc: {
    color: '#A7F3D0',
    fontSize: 13,
    opacity: 0.6,
    marginTop: 2,
  },
  footer: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#064E3B',
    fontSize: 18,
    fontWeight: '800',
    marginRight: 8,
  },
  secondaryButton: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    opacity: 0.8,
  },
});
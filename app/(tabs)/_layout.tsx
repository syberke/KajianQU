import {
  BookOpen,
  Home,
  Trophy,
  User
} from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, router } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function TabsLayout() {
  const { user, profile, loading } = useAuth();
  const insets = useSafeAreaInsets();
  const role = profile?.role;

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/(auth)/welcome');
    }
  }, [loading, user]);

  if (loading || !user || !profile) return null;

  const getTabsForRole = () => {
    const commonTabs = [
      { name: 'index', icon: Home, isCenter: false },
   { name: 'donasi', icon: User, isCenter: false },
    ];

    switch (role) {
      case 'user':
        return [
           { name: 'ChatRooms', icon: Trophy, isCenter: false },
          
          ...commonTabs];
      case 'asatidz':
        return [
                { name: 'asatidz-dashboard', icon: User, isCenter: false },

      { name: 'quranai', icon: Trophy, isCenter: false },
      { name: 'bahtsul-masail', icon: User, isCenter: false },
      { name: 'kilas-balik', icon: User, isCenter: false },
      { name: 'muamalat', icon: User, isCenter: false },
      { name: 'kelas-private', icon: User, isCenter: false },
           { name: 'tanya', icon: User, isCenter: false },
        { name: 'profile', icon: User, isCenter: false },
        { name: 'live-l', icon: User, isCenter: false },//akifin livenya pas dihp aja soalnya ga bisa RTC
        { name: 'kiblat', icon: User, isCenter: false },//akifin livenya pas dihp aja soalnya ga bisa RTC
          ...commonTabs];
      case 'admin':
        return [
             { name: 'admin-dashboard', icon: User, isCenter: false },
       
      { name: 'quranai', icon: Trophy, isCenter: false },
      { name: 'bahtsul-masail', icon: User, isCenter: false },
      { name: 'kilas-balik', icon: User, isCenter: false },
      
      { name: 'kelas-private', icon: User, isCenter: false },
           { name: 'tanya', icon: User, isCenter: false },
        { name: 'profile', icon: User, isCenter: false },
        { name: 'live-l', icon: User, isCenter: false },//akifin livenya pas dihp aja soalnya ga bisa RTC
        { name: 'kiblat', icon: User, isCenter: false },//akifin livenya pas dihp aja soalnya ga bisa RTC
          ...commonTabs];
      default:
        return commonTabs;
    }
  };

  const tabs = getTabsForRole();



  const renderTabIcon = (
    IconComponent: any,
    focused: boolean,
    color: string,
    size: number,
    isCenter = false
  ) => {
    if (isCenter) {
      return (
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            marginTop: -20,
            shadowColor: '#10B981',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.3,
            shadowRadius: 16,
            elevation: 12,
          }}
        >
          <LinearGradient
            colors={focused ? ['#10B981', '#059669'] : ['#E5E7EB', '#D1D5DB']}
            style={{
              flex: 1,
              borderRadius: 32,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 4,
              borderColor: 'white',
            }}
          >
            <IconComponent size={28} color="white" />
          </LinearGradient>
        </View>
      );
    }

    return <IconComponent size={size} color={color} />;
  };



  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom + 8 : 12,
          paddingTop: 12,
          height: Platform.OS === 'ios' ? 85 + insets.bottom : 85,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -8 },
          shadowOpacity: 0.1,
          shadowRadius: 20,
          elevation: 20,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        },
        tabBarLabelStyle: {
          fontWeight: '600',
          fontSize: 11,
          marginTop: 4,
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            tabBarIcon: ({ size, color, focused }) =>
              renderTabIcon(tab.icon, focused, color, size, tab.isCenter),
            tabBarLabel: tab.isCenter ? '' : tab.name,
            title: tab.name,
          }}
        />
      ))}
    </Tabs>
  );
}
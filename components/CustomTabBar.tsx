import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { Home, BookOpen, MessageSquare, User } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const TAB_WIDTH = width / 4;

export default function CustomTabBar({ state, descriptors, navigation }: any) {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: state.index * TAB_WIDTH,
      useNativeDriver: true,
      bounciness: 5,
    }).start();
  }, [state.index]);

  return (
    <View style={styles.container}>
      {/* Background SVG dengan lengkungan */}
      <Svg width={width} height={80} style={styles.svg}>
        <Path
          fill="white"
          d={`M0,20 L${(width / 2) - 100},20 
              Q${(width / 2)},-20 ${width},20 
              L${width},20 L${width},80 L0,80 Z`} 
        />
      </Svg>

      {/* Lingkaran Hijau Bergerak */}
      <Animated.View
        style={[
          styles.activeCircle,
          { 
  transform: [
    { 
      translateX: Animated.add(translateX, (TAB_WIDTH / 2) - 30) 
    }
  ] 
}
        ]}
      />

      {/* Item Menu */}
      <View style={styles.content}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const Icon = index === 0 ? Home : index === 1 ? BookOpen : index === 2 ? MessageSquare : User;

          return (
            <TouchableOpacity key={route.key} onPress={onPress} style={styles.tabItem}>
              <Icon 
                size={24} 
                color={isFocused ? 'white' : '#94a3b8'} 
                strokeWidth={isFocused ? 2.5 : 2}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: width,
    height: 80,
    backgroundColor: 'transparent',
  },
  svg: { position: 'absolute', top: 0 },
  content: { flexDirection: 'row', height: 80 },
  tabItem: { flex: 1, justifyContent: 'center', alignItems: 'center', height: 60, marginTop: 10 },
  activeCircle: {
    position: 'absolute',
    top: -15, 
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#10B981',
    borderWidth: 5,
    borderColor: '#f8fafc', 
    elevation: 10,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
});
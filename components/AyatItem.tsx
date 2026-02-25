import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Play, Pause, Bookmark, BookOpen } from 'lucide-react-native';
import { Ayat } from '../types/types';

// Aktifkan animasi untuk Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Props {
  item: Ayat;
  isPlaying: boolean;
  isBookmarked: boolean; // Tambahkan ini
  onPlayPress: (number: number) => void;
  onBookmarkPress: () => void; // Tambahkan ini
  onPressAyat: () => void; // Untuk history
}

export const AyatItem = ({ item, isPlaying, isBookmarked, onPlayPress, onBookmarkPress, onPressAyat }: Props) => {
  const [showTafsir, setShowTafsir] = useState(false);

  const toggleTafsir = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowTafsir(!showTafsir);
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPressAyat} style={styles.ayatCard}>
      <View style={styles.ayatHeader}>
        <View style={styles.numberCircle}>
          <Text style={styles.numberText}>{item.numberInSurah}</Text>
        </View>
        
        <View style={styles.actionRow}>
          {/* Tombol Tafsir */}
          <TouchableOpacity 
            style={[styles.iconButton, showTafsir && styles.activeIcon]} 
            onPress={toggleTafsir}
          >
            <BookOpen size={18} color={showTafsir ? "#fff" : "#10b981"} />
          </TouchableOpacity>
          
          {/* Tombol Audio */}
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => onPlayPress(item.number)}
          >
            {isPlaying ? <Pause size={18} color="#ef4444" /> : <Play size={18} color="#10b981" />}
          </TouchableOpacity>
          
          {/* Tombol Bookmark */}
          <TouchableOpacity 
            style={[styles.iconButton, isBookmarked && styles.activeBookmark]} 
            onPress={onBookmarkPress}
          >
            <Bookmark 
              size={18} 
              color={isBookmarked ? "#fff" : "#10b981"} 
              fill={isBookmarked ? "#fff" : "transparent"} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.arabicText}>{item.text}</Text>
      <Text style={styles.translationText}>{item.translation}</Text>

      {showTafsir && (
        <View style={styles.tafsirContainer}>
          <Text style={styles.tafsirTitle}>Tafsir Ringkas:</Text>
          <Text style={styles.tafsirText}>
            {item.tafsir || "Memuat tafsir..."}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ayatCard: { 
    backgroundColor: 'white', 
    borderRadius: 20, 
    padding: 18, 
    marginBottom: 16, 
    elevation: 3, 
    shadowColor: '#000', 
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 }
  },
  ayatHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 16 
  },
  numberCircle: { 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    backgroundColor: '#ecfdf5', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  numberText: { color: '#10b981', fontWeight: 'bold', fontSize: 12 },
  actionRow: { flexDirection: 'row' },
  iconButton: { 
    marginLeft: 10, 
    padding: 8, 
    borderRadius: 12, 
    backgroundColor: '#f0fdf4' 
  },
  activeIcon: { backgroundColor: '#10b981' },
  activeBookmark: { backgroundColor: '#10b981' },
  arabicText: { 
    fontSize: 28, 
    textAlign: 'right', 
    color: '#1e293b', 
    lineHeight: 52, 
    marginBottom: 16,
    fontFamily: Platform.OS === 'ios' ? 'Amiri' : 'serif' 
  },
  translationText: { 
    fontSize: 15, 
    color: '#475569', 
    lineHeight: 24,
    textAlign: 'left'
  },
  tafsirContainer: { 
    marginTop: 15, 
    padding: 16, 
    backgroundColor: '#f8fafc', 
    borderRadius: 14, 
    borderLeftWidth: 4, 
    borderLeftColor: '#10b981' 
  },
  tafsirTitle: { fontSize: 13, fontWeight: 'bold', color: '#065f46', marginBottom: 6 },
  tafsirText: { fontSize: 14, color: '#475569', lineHeight: 22, textAlign: 'justify' },
});
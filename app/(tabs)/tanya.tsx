import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react-native';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';

// Aktifkan animasi di Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface QAItem {
  id: number;
  question: string;
  answer: string;
}

const qaData: QAItem[] = [
  {
    id: 1,
    question: "Bagaimana cara membaca Al-Qur'an melalui aplikasi ini?",
    answer: "Anda dapat mengakses menu 'Quran Reader' di tab navigasi bawah untuk memilih surat dan mulai membaca."
  },
  {
    id: 2,
    question: "Apakah fitur Quran AI tersedia 24 jam?",
    answer: "Ya, fitur asisten AI kami tersedia setiap saat untuk membantu menjawab pertanyaan keislaman Anda berdasarkan referensi kitab klasik."
  },
  {
    id: 3,
    question: "Bagaimana cara mendaftar kelas privat dengan Asatidz?",
    answer: "Buka menu 'Kelas Private', pilih ustadz yang Anda inginkan, lalu tentukan jadwal yang tersedia."
  }
];

const QAScreen = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    // Animasi perubahan layout saat accordion terbuka
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tanya Jawab (FAQ)</Text>
      
      {qaData.map((item) => (
        <View key={item.id} style={[styles.card, expandedId === item.id && styles.activeCard]}>
          <TouchableOpacity 
            onPress={() => toggleExpand(item.id)}
            style={styles.header}
            activeOpacity={0.7}
          >
            <View style={styles.questionContainer}>
              <HelpCircle size={20} color={expandedId === item.id ? '#10B981' : '#6B7280'} />
              <Text style={[styles.questionText, expandedId === item.id && styles.activeQuestionText]}>
                {item.question}
              </Text>
            </View>
            <ChevronDown 
              size={20} 
              color="#9CA3AF" 
              style={{ transform: [{ rotate: expandedId === item.id ? '180deg' : '0deg' }] }} 
            />
          </TouchableOpacity>

          {expandedId === item.id && (
            <View style={styles.answerContent}>
              <View style={styles.divider} />
              <Text style={styles.answerText}>{item.answer}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F9FAFB',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    // Shadow ringan
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  activeCard: {
    borderColor: '#10B981',
    borderWidth: 1.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  questionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 10,
  },
  activeQuestionText: {
    color: '#10B981',
  },
  answerContent: {
    paddingBottom: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 12,
  },
  answerText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 22,
  },
});

export default QAScreen;
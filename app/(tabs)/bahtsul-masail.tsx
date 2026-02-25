import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { Search, MessageSquare, ChevronRight, Clock, CheckCircle2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const DUMMY_QUESTIONS = [
  {
    id: "1",
    question: "Bagaimana hukum melakukan transaksi kripto menurut pandangan fikih muamalah kontemporer?",
    category: "Muamalat",
    status: "answered",
    created_at: "2024-03-20T08:00:00Z"
  },
  {
    id: "2",
    question: "Apakah boleh makmum membaca Al-Fatihah saat imam sedang membaca surat dalam shalat jahriyah?",
    category: "Ibadah",
    status: "answered",
    created_at: "2024-03-19T10:30:00Z"
  },
  {
    id: "3",
    question: "Apa hukum menggunakan skincare yang mengandung alkohol?",
    category: "Kontemporer",
    status: "answered",
    created_at: "2024-03-18T15:20:00Z"
  },
  {
    id: "4",
    question: "Bagaimana status wudhu seseorang yang tertidur dalam posisi duduk mantap?",
    category: "Thaharah",
    status: "answered",
    created_at: "2024-03-17T09:00:00Z"
  },
  {
    id: "5",
    question: "Hukum arisan haji dalam perspektif fiqh muamalah, apakah termasuk riba?",
    category: "Muamalat",
    status: "pending",
    created_at: "2024-03-21T11:00:00Z"
  }
];

export default function BahtsulMasailScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(DUMMY_QUESTIONS);


  const fetchQuestions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('questions')
      .select('id, question, category, status, created_at')
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      setQuestions(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => router.push({
        pathname: "/detail-massail",
        params: { id: item.id }
      })}
    >
      <View style={styles.cardHeader}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <View style={styles.statusRow}>
          {item.status === 'answered' ? (
            <CheckCircle2 size={14} color="#22c55e" />
          ) : (
            <Clock size={14} color="#f59e0b" />
          )}
          <Text style={[styles.statusText, { color: item.status === 'answered' ? '#22c55e' : '#f59e0b' }]}>
            {item.status === 'answered' ? 'Terjawab' : 'Menunggu'}
          </Text>
        </View>
      </View>

      <Text style={styles.questionTitle} numberOfLines={2}>
        {item.question}
      </Text>

      <View style={styles.cardFooter}>
        <Text style={styles.dateText}>
          {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
        </Text>
        <View style={styles.detailLink}>
          <Text style={styles.detailText}>Lihat Jawaban</Text>
          <ChevronRight size={16} color="#3b82f6" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#1e40af', '#3b82f6']} style={styles.header}>
        <Text style={styles.headerTitle}>Bahtsul Masail</Text>
        <Text style={styles.headerDesc}>Kumpulan tanya jawab hukum Islam</Text>
        
        <View style={styles.searchBar}>
          <Search size={20} color="#64748b" />
          <TextInput 
            placeholder="Cari persoalan..." 
            style={styles.input}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </LinearGradient>

      {loading ? (
        <ActivityIndicator size="large" color="#3b82f6" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={questions.filter(q => q.question.toLowerCase().includes(search.toLowerCase()))}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9' },
  header: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 25, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#fff' },
  headerDesc: { fontSize: 14, color: '#e0e7ff', marginTop: 4, marginBottom: 20 },
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    paddingHorizontal: 15, 
    borderRadius: 15, 
    height: 50,
    elevation: 5
  },
  input: { flex: 1, marginLeft: 10, fontSize: 16 },
  listContainer: { padding: 20 },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    padding: 18, 
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  categoryBadge: { backgroundColor: '#eff6ff', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  categoryText: { fontSize: 12, fontWeight: '700', color: '#3b82f6' },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statusText: { fontSize: 12, fontWeight: '600' },
  questionTitle: { fontSize: 16, fontWeight: '700', color: '#1e293b', lineHeight: 24, marginBottom: 15 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingTop: 12 },
  dateText: { fontSize: 12, color: '#94a3b8' },
  detailLink: { flexDirection: 'row', alignItems: 'center' },
  detailText: { fontSize: 12, fontWeight: '700', color: '#3b82f6', marginRight: 4 }
});
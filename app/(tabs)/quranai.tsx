import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const API_KEY = process.env.EXPO_PUBLIC_QURANI_API_KEY;
const WS_URL = `wss://api.qurani.ai?api_key=${API_KEY}`;

export default function QuranAiScreen() {
  const [data, setData] = useState({ verseIndex: 1, wordIndex: 1 });
  const [isRecording, setIsRecording] = useState(false);
  
  const connection = useRef<WebSocket | null>(null);
  const recordingRef = useRef<Audio.Recording | null>(null);

 
  useEffect(() => {
    connection.current = new WebSocket(WS_URL);

    connection.current.onopen = () => console.log("Terhubung ke Qurani AI");
    
    connection.current.onmessage = (e) => {
      const response = JSON.parse(e.data);
      if (response.event === "check_tilawa") {
        setData({
          verseIndex: response.verse_index,
          wordIndex: response.word_index,
        });
      }
    };

    return () => connection.current?.close();
  }, []);


  const startSession = () => {
    const payload = {
      method: "StartTilawaSession",
      chapter_index: 1, 
      verse_index: 1,
      word_index: 1,
      hafz_level: 1,
      tajweed_level: 3,
    };
    connection.current?.send(JSON.stringify(payload));
    console.log("Session Started");
  };

  // 3. Fungsi Rekam & Kirim Audio
  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      recordingRef.current = recording;
      setIsRecording(true);

      // Note: Untuk Real-time murni, idealnya menggunakan library base64 
      // atau buffer. Di sini kita simulasi pengiriman data.
      recording.setOnRecordingStatusUpdate(async (status) => {
        if (status.canRecord && connection.current?.readyState === WebSocket.OPEN) {
          // Logika pengiriman chunk audio ke server (Binary/Opus)
        }
      });

    } catch (err) {
      console.error('Gagal merekam', err);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    await recordingRef.current?.stopAndUnloadAsync();
    // Kirim sisa data terakhir
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>AI Recitation Feedback</Text>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.btnBlue} onPress={startSession}>
          <Text style={styles.btnText}>1. Start Session</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={isRecording ? styles.btnRed : styles.btnGreen} 
          onPress={isRecording ? stopRecording : startRecording}
        >
          <Text style={styles.btnText}>{isRecording ? "Stop Record" : "2. Start Record"}</Text>
        </TouchableOpacity>
      </View>

      {/* Visualisasi Ayat (Al-Fatihah) */}
      <View style={styles.quranContainer}>
        <Text style={styles.arabicText}>
          {/* Mapping ayat di sini seperti contoh web kamu */}
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </Text>
        <Text style={{color: data.verseIndex > 1 ? 'green' : 'gray'}}>
          Status: Verse {data.verseIndex}, Word {data.wordIndex}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center', paddingTop: 60 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 30 },
  buttonRow: { flexDirection: 'row', gap: 10, marginBottom: 40 },
  btnBlue: { backgroundColor: '#3b82f6', padding: 15, borderRadius: 10 },
  btnGreen: { backgroundColor: '#10b981', padding: 15, borderRadius: 10 },
  btnRed: { backgroundColor: '#ef4444', padding: 15, borderRadius: 10 },
  btnText: { color: 'white', fontWeight: 'bold' },
  quranContainer: { width: '100%', padding: 20, backgroundColor: '#f3f4f6', borderRadius: 15 },
  arabicText: { fontSize: 24, textAlign: 'right', lineHeight: 45, fontFamily: 'serif' }
});
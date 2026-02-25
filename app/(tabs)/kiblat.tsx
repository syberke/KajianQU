import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import * as Location from 'expo-location';

export default function KiblatScreen() {
  const [magnetometer, setMagnetometer] = useState(0);

  useEffect(() => {
    // Meminta izin lokasi (penting untuk perhitungan arah kiblat yang akurat)
    (async () => {
      await Location.requestForegroundPermissionsAsync();
    })();

    // Mengaktifkan sensor magnetik
    Magnetometer.setUpdateInterval(100);
    const subscription = Magnetometer.addListener((data) => {
      // Menghitung derajat dari data x dan y
      let angle = Math.atan2(data.y, data.x) * (180 / Math.PI);
      if (angle < 0) angle += 360;
      setMagnetometer(Math.round(angle));
    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arah Kiblat</Text>
      <View style={{ transform: [{ rotate: `${360 - magnetometer}deg` }] }}>
        {/* Kamu bisa ganti dengan gambar kompas nanti */}
        <Text style={styles.compassPointer}>⬆️</Text>
      </View>
      <Text style={styles.degree}>{magnetometer}°</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  degree: {
    fontSize: 24,
    marginTop: 20,
  },
  compassPointer: {
    fontSize: 80,
  },
});
import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native'
import { supabase } from '../../lib/supabase'

export default function EditProfileAsatidz() {
  const [fullName, setFullName] = useState('')
  const [bio, setBio] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    const { data, error } = await supabase
      .from('profiles')
      .select('full_name, bio, specialization')
      .eq('id', user.id)
      .single()

    if (error) {
      console.log(error)
      return
    }

    if (data) {
      setFullName(data.full_name ?? '')
      setBio(data.bio ?? '')
      setSpecialization(data.specialization ?? '')
    }
  }

  const handleUpdate = async () => {
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        Alert.alert('Error', 'User tidak ditemukan')
        return
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          bio: bio,
          specialization: specialization,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (error) throw error

      Alert.alert('Sukses', 'Profil berhasil diperbarui!')
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Data Asatidz</Text>

      <View style={styles.inputBox}>
        <Text style={styles.label}>Nama Lengkap</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />

        <Text style={styles.label}>Spesialisasi (Fikih, Tauhid, dll)</Text>
        <TextInput
          style={styles.input}
          value={specialization}
          onChangeText={setSpecialization}
        />

        <Text style={styles.label}>Bio Singkat</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          multiline
          value={bio}
          onChangeText={setBio}
        />

        <TouchableOpacity
          style={styles.btn}
          onPress={handleUpdate}
          disabled={loading}
        >
          <Text style={styles.btnText}>
            {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20
  },
  inputBox: {
    gap: 15
  },
  label: {
    fontWeight: '600',
    color: '#475569'
  },
  input: {
    backgroundColor: '#f1f5f9',
    padding: 15,
    borderRadius: 10
  },
  btn: {
    backgroundColor: '#059669',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold'
  }
})
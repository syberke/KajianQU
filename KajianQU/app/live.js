import React, { useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo, StreamCall } from '@stream-io/video-react-native-sdk';
import api from '../services/api'; // Axios kamu

const apiKey = 'tqzwvu8f68ge';

export default function LiveKajian() {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);

  useEffect(() => {
    const initStream = async () => {
      // 1. Ambil token dari Django
      const res = await api.get('/get-stream-token/');
      
      // 2. Setup Client
      const user = { id: 'user_id_dari_django' };
      const _client = new StreamVideoClient({ apiKey, user, token: res.data.token });
      
      // 3. Buat/Join Call (Kajian ID)
      const _call = _client.call('default', 'kajian_id_123');
      await _call.join({ create: true });
      
      setClient(_client);
      setCall(_call);
    };

    initStream();
  }, []);

  if (!client || !call) return <Text>Loading...</Text>;

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        {/* UI Live Stream Otomatis dari GetStream */}
        <Text style={{marginTop: 50}}>Kajian Sedang Berlangsung</Text>
        {/* Kamu bisa tambah CallControls, ParticipantList, dll di sini */}
      </StreamCall>
    </StreamVideo>
  );
}
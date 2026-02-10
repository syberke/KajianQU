import React, { useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo, StreamCall } from '@stream-io/video-react-native-sdk';
import api from '../services/api'; 

const apiKey = 'tqzwvu8f68ge';

export default function Live () {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);

  useEffect(() => {
    const initStream = async () => {
  
      const res = await api.get('/get-stream-token/');
      
   
      const user = { id: 'user_id_dari_django' };
      const _client = new StreamVideoClient({ apiKey, user, token: res.data.token });
      
     
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
                <Text style={{marginTop: 50}}>Kajian Sedang Berlangsung</Text>

      </StreamCall>
    </StreamVideo>
  );
}
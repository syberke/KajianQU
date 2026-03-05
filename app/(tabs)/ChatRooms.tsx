import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { GiftedChat, Bubble, Send, IMessage } from 'react-native-gifted-chat';
import { supabase } from '../../lib/supabase';
import { Send as SendIcon } from 'lucide-react-native';

export default function ChatRoom({ route }: any) {
  const { classId, className } = route.params;
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      fetchMessages();
    };
    getCurrentUser();

    const channel = supabase
      .channel(`chat-${classId}`)
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'class_messages', 
          filter: `class_id=eq.${classId}` 
        },
        (payload) => {
          const newMessage = transformMessage(payload.new);
          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, [newMessage])
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('class_messages')
      .select('*')
      .eq('class_id', classId)
      .order('created_at', { ascending: false });

    if (data) {
      const formattedMessages = data.map(transformMessage);
      setMessages(formattedMessages);
    }
    setLoading(false);
  };

  const transformMessage = (msg: any): IMessage => ({
    _id: msg.id,
    text: msg.text,
    createdAt: new Date(msg.created_at),
    user: {
      _id: msg.user_id,
      name: msg.user_name || 'Hamba Allah',
      avatar: msg.user_avatar || 'https://ui-avatars.com/api/?name=' + msg.user_name,
    },
  });

  const onSend = useCallback(async (newMessages: IMessage[] = []) => {
    const message = newMessages[0];
    
    // FIX ERROR: Tambahkan 'as any' setelah .from()
    const { error } = await supabase
      .from('class_messages')
      .insert([
        {
          class_id: classId,
          user_id: user.id,
          text: message.text,
          user_name: user.user_metadata?.full_name || 'Santri',
        }
      ] as any); 

    if (error) console.error("Gagal kirim pesan:", error.message);
  }, [user, classId]);

  const renderBubble = (props: any) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: '#059669' },
        left: { backgroundColor: '#f1f5f9' },
      }}
      textStyle={{
        right: { color: '#fff' },
        left: { color: '#1e293b' },
      }}
    />
  );

  if (loading) return <ActivityIndicator style={{flex:1}} size="large" color="#059669" />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{className}</Text>
        <Text style={styles.headerSubtitle}>Grup Chat Private</Text>
      </View>
  <GiftedChat
  messages={messages}
  onSend={(msgs) => onSend(msgs)}
  user={{ _id: user?.id }}
  renderBubble={renderBubble}
 
  textInputProps={{
    placeholder: "Tulis pesan ke Ustadz...", 
  }}
  renderSend={(props: any) => (
    <Send {...props} containerStyle={styles.sendContainer}>
      <SendIcon size={22} color="#059669" />
    </Send>
  )}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { paddingTop: 50, paddingBottom: 15, backgroundColor: '#059669', alignItems: 'center' },
  headerTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  headerSubtitle: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  sendContainer: { justifyContent: 'center', alignItems: 'center', marginRight: 10, marginBottom: 5 },
});